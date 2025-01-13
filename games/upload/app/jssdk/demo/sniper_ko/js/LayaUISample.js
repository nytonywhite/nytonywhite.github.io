var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var test = ui.test.TestPageUI;
var Label = laya.ui.Label;
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var GameUI = ui.GameUI;
var Stage = Laya.Stage;
var Animation = Laya.Animation;
var Effect = /** @class */ (function () {
    function Effect(_url, _cx, _cy, _px, _py, _callback, _loop) {
        if (_loop === void 0) { _loop = false; }
        this.effect = new Animation();
        this.px = _px;
        this.py = _py;
        this.callback = _callback;
        this.cx = _cx;
        this.cy = _cy;
        this.effect.loadAtlas(_url, Handler.create(this, this.onLoadedEffect));
    }
    Effect.prototype.onLoadedEffect = function () {
        this.effect.play(0, false);
        this.effect.pivotX = this.cx;
        this.effect.pivotY = this.cy;
        Laya.stage.addChild(this.effect);
        this.effect.x = this.px;
        this.effect.y = this.py;
        this.effect.on("complete", this, function () {
            this.effect.stop();
            this.effect.destroy();
            if (this.callback) {
                this.callback.apply();
            }
        });
    };
    return Effect;
}());
var Monster = /** @class */ (function () {
    function Monster(stage, isMove) {
        if (isMove === void 0) { isMove = true; }
        this.create_pos_x = 660;
        this.create_pos_y = 190;
        this.target_pos_y = 440; //目标点
        this.total_hp = 90;
        this.current_hp = 90;
        this.is_dead = false;
        //1普通伤害死亡  2爆头死亡 
        this.dead_type = 1;
        //lv1的爆头区域
        this.rect_head_1 = new Laya.Rectangle(41, 5, 30, 30);
        //lv1的身体区域
        this.rect_body_1 = new Laya.Rectangle(26, 37, 80, 130);
        this.rect_head_2 = new Laya.Rectangle(40, 2, 40, 40);
        this.rect_body_2 = new Laya.Rectangle(22, 42, 80, 130);
        this.rect_head_3 = new Laya.Rectangle(37, 2, 50, 50);
        this.rect_body_3 = new Laya.Rectangle(22, 53, 80, 125);
        this.rect_head_4 = new Laya.Rectangle(30, 2, 60, 60);
        this.rect_body_4 = new Laya.Rectangle(22, 61, 80, 110);
        this.monster_ani = new Animation();
        this.monster_ani.loadAnimation("Monster.ani");
        this.monster_ani.play(0, true, "run");
        var cx = 420 + 400 * Math.random();
        stage.addChildAt(this.monster_ani, 0);
        this.hp = new ui.HpUI();
        this.hp.x = 15;
        this.hp.y = -20;
        this.monster_ani.addChild(this.hp);
        if (isMove) {
            this.monster_ani.x = cx;
            this.monster_ani.y = this.create_pos_y;
            this.run();
        }
        else {
            this.monster_ani.x = 534;
            this.monster_ani.y = this.create_pos_y;
        }
        this.monster_ani.on(laya.events.Event.LABEL, this, function (key) {
            if (key == "attack1") {
                this.attack2();
            }
            else if (key == "attack2") {
                //输出伤害
                Laya.stage.event("get_hurt");
            }
            else if (key == "dead") {
                //死亡
                this.monster_ani.removeSelf();
                this.monster_ani.stop();
                this.monster_ani.destroy();
                Laya.stage.event("add_gold", this.dead_type);
            }
        });
        this.monster_ani.on(laya.events.Event.CLICK, this, function (e) {
        });
    }
    Monster.prototype.stop_game = function () {
        this.is_dead = true;
        // this.monster_ani.removeSelf();
        this.monster_ani.stop();
        // if(this.tween)
        // {
        // 	this.tween.pause();
        // }
    };
    Monster.prototype.run = function () {
        var mmm = Math.ceil(Math.random() * 200);
        this.tween = Laya.Tween.to(this.monster_ani, { y: this.target_pos_y - mmm }, 2000, null, Laya.Handler.create(this, function () {
            this.attack1();
        }), 500);
    };
    // 0 未命中 1 命中身体 2 爆头
    Monster.prototype.chectIsAttack = function (p, lv) {
        var rect1;
        var rect2;
        var num = 30;
        if (lv == 1) {
            rect1 = this.rect_head_1;
            rect2 = this.rect_body_1;
        }
        else if (lv == 2) {
            rect1 = this.rect_head_2;
            rect2 = this.rect_body_2;
        }
        else if (lv == 3) {
            rect1 = this.rect_head_3;
            rect2 = this.rect_body_3;
            num = 50;
        }
        else if (lv == 4) {
            rect1 = this.rect_head_4;
            rect2 = this.rect_body_4;
            num = 50;
        }
        p = this.monster_ani.globalToLocal(p);
        if (rect1.contains(p.x, p.y)) {
            this.dead_type = 2;
            this.current_hp = 0;
            this.checkStatus();
            return 2;
        }
        else if (rect2.contains(p.x, p.y)) {
            this.dead_type = 1;
            this.current_hp -= num;
            this.checkStatus();
            return 1;
        }
        return 0;
    };
    Monster.prototype.checkStatus = function () {
        if (this.is_dead)
            return;
        if (this.current_hp <= 0) {
            this.monster_ani.play(0, false, "dead");
            this.hp.hp.width = 0;
            this.is_dead = true;
            if (this.tween) {
                this.tween.pause();
                this.tween = null;
            }
            return;
        }
        this.hp.hp.width = this.current_hp / this.total_hp * 90;
    };
    Monster.prototype.attack1 = function () {
        this.monster_ani.play(0, false, "attack1");
    };
    Monster.prototype.attack2 = function () {
        if (this.is_dead)
            return;
        this.monster_ani.play(0, true, "attack2");
        laya.media.SoundManager.playSound("sound/di.mp3");
    };
    return Monster;
}());
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super.call(this) || this;
    }
    return GameOver;
}(ui.GameOverUI));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.my_total_hp = 200;
        _this.my_current_hp = 200;
        _this.my_current_level = 1;
        _this.is_dead = false;
        _this.hurt_time = 0;
        _this.old_level = 1;
        //自己受到伤害
        Laya.stage.on("get_hurt", _this, function () {
            if (this.is_dead)
                return;
            this.my_current_hp -= 1;
            this.hurt_time += 1;
            if (this.hurt_time >= 10) {
                this.hurt_time = 0;
                this.dan1.x = Math.random() * 960;
                this.dan1.y = Math.random() * 610;
                this.dan2.x = Math.random() * 960;
                this.dan2.y = Math.random() * 610;
                this.dan3.x = Math.random() * 960;
                this.dan3.y = Math.random() * 610;
                this.dan4.x = Math.random() * 960;
                this.dan4.y = Math.random() * 610;
                Laya.Tween.to(this.hurtview, { alpha: 1 }, 200, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(this.hurtview, { alpha: 0 }, 300, null, null);
                }));
            }
            if (this.my_current_hp <= 0) {
                this.hp.width = 0;
                this.is_dead = true;
                Laya.stage.event("game_over");
                return;
            }
            var value = this.my_current_hp / this.my_total_hp * 235;
            this.hp.width = value;
        });
        _this.install.on(laya.events.Event.CLICK, _this, function () {
            this.go_to_play();
        });
        return _this;
    }
    Game.prototype.game_lose = function (total, explode, lv) {
        var gameover = new GameOver();
        gameover.show();
        gameover.total.text = total + "";
        gameover.bao.text = explode + "";
        gameover.task.text = (total - explode) + "";
        laya.media.SoundManager.playMusic("sound/lose.mp3");
        if (lv == 1) {
            gameover.gun.x = 925;
            gameover.gun.y = 484;
        }
        else if (lv == 2) {
            gameover.gun.x = 925;
            gameover.gun.y = 318;
        }
        else if (lv == 3) {
            gameover.gun.x = 925;
            gameover.gun.y = 165;
        }
        else {
            gameover.gun.x = 925;
            gameover.gun.y = 16;
        }
        gameover.continue.on(laya.events.Event.CLICK, this, function () {
            this.go_to_play();
        });
    };
    Game.prototype.go_to_play = function () {
        showAd();

        // laya.utils.Browser.window.install();
        // laya.utils.Browser.window.location.href = " https://play.google.com/store/apps/details?id=com.happiplay.lucky28&hl=en";
    };
    Game.prototype.add_gold = function (num) {
        this.gold.text = num + "";
    };
    Game.prototype.open_door = function () {
        this.door.play(0, false);
        this.door.on("complete", this, function () {
            game.ani1.play(0, false);
            laya.media.SoundManager.playSound("sound/reload.mp3");
            game.ani1.on("complete", this, function () {
                this.tween = Laya.Tween.to(game.bg, { scaleX: 1.2, scaleY: 1.2 }, 300, null, null);
            });
            game.ani4.play(0, false);
            Laya.stage.event("game_guide");
        });
    };
    Game.prototype.clearGuide = function () {
        game.tips.visible = false;
        game.install.visible = true;
        game.tips2.visible = false;
    };
    Game.prototype.change_gun = function (lv) {
    };
    Game.prototype.head_kill = function (num) {
        game.killicon.visible = true;
        game.killnum.visible = true;
        game.killnum.text = "x" + num;
        game.kill.play(0, false);
        if (num > 6)
            return;
        laya.media.SoundManager.playSound("sound/" + num + ".mp3");
    };
    Game.prototype.head_kill_recover = function () {
        game.killicon.visible = false;
        game.killnum.visible = false;
        game.kill.stop();
    };
    Game.prototype.gun_shoot = function () {
        game.shoot.play(0, false);
    };
    Game.prototype.show_level_up = function (gold) {
        var lv = 1;
        if (gold >= 1000 && gold < 2000) {
            lv = 2;
        }
        else if (gold >= 2000 && gold < 3000) {
            lv = 3;
        }
        else if (gold >= 3000) {
            lv = 4;
        }
        if (this.old_level == lv)
            return;
        this.old_level = lv;
        this.gunicon.skin = "res/gun_level" + lv + ".png";
        this.up_btn.visible = true;
        this.level_up.play(0, false);
        this.level_up.on("complete", this, function () {
            this.lvtips.visible = true;
            this.level_tips.play(0, true);
            this.up_btn.on(laya.events.Event.CLICK, this, function () {
                Laya.stage.event("level_up", lv);
                this.up_btn.visible = false;
                this.level_tips.stop();
                this.lvtips.visible = false;
            });
        });
    };
    return Game;
}(ui.GameUI));
Laya.init(1334, 750);
Laya.stage.scaleMode = "showall";
Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
Laya.stage.frameRate = Stage.FRAME_FAST;
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
Laya.stage.bgColor = "#232628";
Laya.loader.load("lang.lang", Handler.create(this, onLoadedFirst), null, Loader.JSON);
var current_time = 0;
var monster_list = new Array();
var game;
var game_start = false;
var my_current_gold = 0;
var my_gun_level = 1;
var my_total_point = 0;
var my_explode_point = 0;
var head_kill_num = 0;
var is_game_over = false;
function createMonster(num) {
    for (var i = 0; i < num; i++) {
        var mm = new Monster(game.monster_stage);
        monster_list.push(mm);
    }
}
function onLoadedFirst() {
    var obj = Laya.loader.getRes("lang.lang");
    laya.display.Text.langPacks = obj;
    Laya.loader.load([{ url: "res/atlas/res.json", type: Loader.ATLAS },
        { url: "res/atlas/person.json", type: Loader.ATLAS },
        { url: "res/atlas/door.json", type: Loader.ATLAS },
        { url: "res/atlas/shoot2.json", type: Loader.ATLAS },
        { url: "res/atlas/shoot3.json", type: Loader.ATLAS },
        { url: "res/atlas/shoot4.json", type: Loader.ATLAS }
    ], Handler.create(this, this.onLoaded));
}
function onLoaded() {
    //实例UI界面
    game = new Game();
    Laya.stage.addChild(game);
    // game.ani1.play(0,false);
    game.open_door();
    laya.media.SoundManager.playMusic("sound/bgm.mp3");
    Laya.stage.on("game_guide", this, function () {
        var mm = new Monster(game.monster_stage, false);
        monster_list.push(mm);
        game.ani6.play();
    });
    var fun = function () {
        head_kill_num = 0;
        game.head_kill_recover();
    };
    Laya.stage.on("add_gold", this, function (type) {
        if (type == 1) {
            my_current_gold += 50;
            my_total_point += 50;
        }
        else {
            head_kill_num += 1;
            game.head_kill(head_kill_num);
            Laya.timer.once(2000, this, fun);
            my_current_gold += 100;
            my_total_point += 100;
            my_explode_point += 100;
        }
        game.add_gold(my_current_gold);
        game.show_level_up(my_current_gold);
    });
    Laya.stage.on("level_up", this, function (lv) {
        var gun1 = get_gun_by_lv(my_gun_level);
        Laya.Tween.to(gun1, { y: 782 }, 200, null, Laya.Handler.create(this, function () {
            gun1.visible = false;
            var gun2 = get_gun_by_lv(lv);
            laya.media.SoundManager.playSound("sound/reload.mp3");
            Laya.Tween.to(gun2, { y: 0 }, 200, null, null);
        }));
        my_gun_level = lv;
    });
    Laya.stage.on("game_over", this, function () {
        Laya.timer.clearAll(this);
        game.game_lose(my_total_point, my_explode_point, my_gun_level);
        is_game_over = true;
        for (var _i = 0, monster_list_1 = monster_list; _i < monster_list_1.length; _i++) {
            var mm = monster_list_1[_i];
            if (mm.is_dead == false) {
                mm.stop_game();
            }
        }
    });
    Laya.stage.on(laya.events.Event.CLICK, this, function () {
        if (is_game_over)
            return;
        var is_target = false;
        laya.media.SoundManager.playSound("sound/shoot.mp3");
        for (var _i = 0, monster_list_2 = monster_list; _i < monster_list_2.length; _i++) {
            var mm = monster_list_2[_i];
            if (mm.is_dead == false) {
                var status = mm.chectIsAttack(new Laya.Point(Laya.stage.mouseX, Laya.stage.mouseY), my_gun_level);
                if (status == 1 || status == 2) {
                    // game.gun_shoot();
                    var gun1 = get_gun_by_lv(my_gun_level);
                    gun1.play(0, false);
                    is_target = true;
                    gameStart();
                    var eff = new Effect("effect/effect2.atlas", 90, 125, Laya.stage.mouseX, Laya.stage.mouseY, null);
                    break;
                }
            }
        }
        if (is_target == false) {
            //达到地上了
            var eff = new Effect("effect/effect1.atlas", 70, 60, Laya.stage.mouseX, Laya.stage.mouseY, null);
        }
    });
}
function get_gun_by_lv(lv) {
    var cur_gun;
    if (lv == 1) {
        cur_gun = game.shoot;
    }
    else if (lv == 2) {
        cur_gun = game.shoot2;
    }
    else if (lv == 3) {
        cur_gun = game.shoot3;
    }
    else if (lv == 4) {
        cur_gun = game.shoot4;
    }
    return cur_gun;
}
function gameStart() {
    if (game_start == false) {
        game_start = true;
        game.clearGuide();
        monster_list[0].run();
        Laya.timer.loop(2000, this, function () {
            current_time += 1;
            createMonster(1);
        });
        Laya.timer.loop(3000, this, function () {
            current_time += 1;
            if (my_gun_level == 4) {
                createMonster(2);
            }
            else {
                createMonster(1);
            }
        });
        Laya.timer.loop(6000, this, function () {
            current_time += 1;
            if (my_gun_level == 4) {
                createMonster(3);
            }
            else {
                createMonster(1);
            }
        });
    }
}
//# sourceMappingURL=LayaUISample.js.map