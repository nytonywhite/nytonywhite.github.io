define(["jquery", 'facebook'], function() {

    FB.init({
        appId: appId,
        version: 'v2.4'
    });
    FB.getLoginStatus(function(response) {
        console.log(response);
        statusChangeCallback(response)
    });

    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            login(response)
        } else{

            FB.login(function(response) {
                if (response.authResponse) {
                    login(response);
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'user_friends, public_profile'});

        } 
    }

    function login(response) {

        var fb_id = response.authResponse.userID; //'100004200403374';
        var access_token = response.authResponse.accessToken; 

        /** 然后将用户的信息返回填充到页面**/
        require(["jquery", "user", 'friend', "business"],
         function(jQuery, user, friend, business) {

            var user_id = '';
            user.create({
                fb_id: fb_id,
                access_token: access_token
            }, function(data) {
                console.log(data.code)

                if (data.code == 0) {
                    user_id = data.rows;
                    $("#app_user_id").html(user_id);
                    
                    /** 获取用户的基本信息*/
                    user.read();

                    /** 获取好友的信息 */
                    friend.read(business.slide);
                }

            });

        });

        dialog();
    }

    function dialog(){

         /** 邀请好友*/
        $(".invite_friend").click(function() {

            /***  好友请求*/
            FB.ui({
                method: 'apprequests',
                message: 'invite  friend'
                    //action_type:'send', //action_type 包括 send,TURN,邀请好友的情况，send类型需要有object_id
            }, function(response) {
                console.log(response);
                if(response.to){

                     FB.ui({method: 'apprequests',
                        message: 'YOUR_MESSAGE_HERE',
                        to: response.to
                        //action_type:'TURN'
                        //object_id: response.request, // e.g. '191181717736427' 
                        //action_type:'send',
                        //filters:[{name:'GROUP_1_NAME', user_ids:response.to}]
                        // title: args.title,
                        // filters: args.filters,
                        // message: args.body,
                        // data: args.urlMessage,
                        // to: recipients
                    }, function(response){
                        console.log(response);
                    });
                }
                  
            });

        });

        /** 分享对话框 **/
        $(".share_dialog").click(function() {

            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object: 'https://adpope.lenzmx.com',
                })
            }, function(response) {});

        });

        $(".send_dialog").click(function() {

            FB.ui({
                method: 'send',
                link: 'https://adpope.lenzmx.com',
            });
        });

        $(".feed_dialog").click(function(){
            FB.ui({
              method: 'feed',
              link: 'https://adpope.lenzmx.com',
              caption: 'send freed',
            }, function(response){});

        });

        /** 单个好友的邀请*/
        $("#j-friend").on("click", "li", function(){
            var self = $(this);
            var fb_id = self.data("fbid");
            FB.ui({method: 'apprequests',
                message: 'invite friend',
                to: fb_id
            }, function(response){
                console.log(response);
                self.addClass("f-current")
            });
        })
        
    }


});
