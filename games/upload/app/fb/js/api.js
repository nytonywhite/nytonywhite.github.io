/*******************************************************************************************
 *                          API 配置
 *******************************************************************************************/
var API = (function() {

    /**
     * 配置
     *@debug_url 调试的地址， 默认的指向ui/mock/
     *@online_url 产品/预发布的地址 
     */
    function cfg(debug_url, online_url) {
        if (IS_DEBUG == false) { //线上
            return SITE_URL + online_url;
        } else {

            /** 这是否可以使用线上地址，true 表示使用线上地址，否则使用mock地址*/
            var opts = arguments[2] ? arguments[2] : false;
            if (opts == false) {
                return BASE_URL + 'ui/mock/' + debug_url;
            }
            return SITE_URL + online_url;
        }
    }
    var api = {
        common: {
            accounts: cfg('common/accounts.json', 'sys/setting/setAccount', false),
        },       
        user: {
            user: {
                read:cfg('user/user/read.json', 'user/user/read', true),
                create:cfg('user/user/create.json', 'user/user/create', true),
            },
            friend: {
                read:cfg('user/friend/read.json', 'user/friend/read', true)
            },
        },
    };
    return api;
})();
