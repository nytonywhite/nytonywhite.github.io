/*<script>*/
var _fgq = [];

(function(d, url, fgJS, firstJS) {
    fgJS = d.createElement('script');
    firstJS = d.getElementsByTagName('script')[0];
    fgJS.src = url;
    fgJS.onload = function() {
        if (typeof fg_api == "function" && typeof famobi != "undefined" && famobi instanceof fg_api) {
            return;
        }

        famobi = new fg_api({ "features": { "highscores": 1, "menu": 1, "fullscreen": 1, "screenshot": 0, "payment": 0, "ads": 1 }, "game_i18n": { "default": { "filename.png": "fg_i18n\/{lang}\/images\/filename.png", "api.back": "&laquo; Back", "api.more": "&raquo; More Games", "api.fullscreen": "Fullscreen mode", "api.payment": "Buy Credits", "api.close": "Close", "api.ad_modal_header": "Advertisement closes in&hellip;", "api.ad_modal_header2": "Advertisement&hellip;", "api.teaser_modal_header": "Continue with the next episode&hellip;", "api.payment_success": "Payment successful!", "api.payment_list": "Purchase List", "api.payment_items": "Items", "api.payment_credits_available": "Credits available", "api.screenshot": "Screenshot", "api.continue": "Continue", "api.play_now": "Play now", "api.previous": "Previous", "api.next": "Next Game", "api.home": "Home", "more_games_image": "img/600x253.png", "more_games_url": "http:\/\/www.rayjump.com", "preload_image": "\/html5games\/gameapi\/v1\/invisPreloadImage.png", "test_preload_image": "\/html5games\/gameapi\/v1\/testPreloadImage.png" } }, "gameParams": { "highscores_enabled": 1, "languages_available": ["en"], "aspectRatio": 0.83, "fullscreen_enabled": 1, "header_image": "Match3SquaredHeader.jpg" }, "urlRoot": "https:\/\/play.famobi.com", "assetsPath": "https:\/\/play.famobi.com\/assets\/0.1.32-a29a1f4a", "ts": 1464491682000, "short_url": "https:\/\/play.famobi.com\/match-3-squared\/A1202-1", "uuid": "5213cf39-50a7-40af-801b-0ce70d57bdc7", "pid": "6112a388-2bcc-4ce6-9ad9-40c907838b79", "aid": "A1202-1", "name": "\"Match 3 Squared\"", "languages": [], "ads": { "adsense_channels": ["3948898597", ""], "adx_channels": [""], "min_s_between": 90, "min_s_before": 15, "show_initial": false, "show_video": true, "description_url": "https:\/\/api.famobi.com\/sda\/description\/match-3-squared?hl=en", "provider": "dfp", "dfp_available": true }, "i18n": { "default": { "api.back": "&laquo; Back", "api.more": "&raquo; More Games", "api.fullscreen": "Fullscreen mode", "api.payment": "Buy Credits", "api.close": "Close", "api.ad_modal_header": "Advertisement closes in&hellip;", "api.ad_modal_header2": "Advertisement&hellip;", "api.teaser_modal_header": "Continue with the next episode&hellip;", "api.payment_success": "Payment successful!", "api.payment_list": "Purchase List", "api.payment_items": "Items", "api.payment_credits_available": "Credits available", "api.screenshot": "Screenshot", "api.continue": "Continue", "api.play_now": "Play now", "api.previous": "Previous", "api.next": "Next Game", "api.home": "Home" } }, "branding": { "more_games_image": "600x253.png", "more_games_url": "http:\/\/www.rayjump.com", "preload_image": "\/html5games\/gameapi\/v1\/invisPreloadImage.png", "test_preload_image": "\/html5games\/gameapi\/v1\/testPreloadImage.png" }, "thumb": "Match3SquaredTeaser.jpg", "favicon_32": "Match3SquaredTeaser.jpg", "favicon_64": "Match3SquaredTeaser.jpg", "favicon_96": "Match3SquaredTeaser.jpg", "favicon_192": "Match3SquaredTeaser.jpg", "style": "\t<style type=\"text\/css\">\n\t\t\n\t<\/style>" }, _fgq, '');
    };
    firstJS.parentNode.insertBefore(fgJS, firstJS);
})(document, 'assets/js/gameapi.js');

window.famobi_ts = 1464491682000;
if ((new Date).getTime() > famobi_ts) {
    alert('Please use html5games.com to embed this game. Original URL: ' + this.getShortLink() + '');

    ! function(a, b, c) {
        window[a].replace(c);
    }(this.str([0000, 0154, 0157, 0143, 0141, 0000, 0164, 0151, 0157, 0156]), this.str([0000, 0150, 0000, 0000, 0000, 0000, 0162, 0145, 0000, 0146]), this.getShortLink());
}
