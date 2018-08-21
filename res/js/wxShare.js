(function($) {
    $.ajax({
        url: 'http://wxpay.medlive.cn/api.php?c=user&action=getSignPackage&domain=test',
        dataType: 'jsonp',
        success: function(o) {
            console.log(o.data);
            var jsApiList = [
                //所有要调用的 API 都要加到这个列表中
                "onMenuShareTimeline",//分享到朋友圈接口
                "onMenuShareAppMessage",//分享给朋友接口
                "onMenuShareQQ",//分享到qq接口
                //"onMenuShareWeibo",//分享到腾讯微博
                "onMenuShareQZone"//分享到QQ空间
            ];
            wx.config({
                debug: false,
                appId: o.data.appId,
                timestamp: o.data.timestamp,
                nonceStr: o.data.nonceStr,
                signature: o.data.signature,
                rawString: o.data.rawString,
                jsApiList: jsApiList
            });

            wx.error(function(res){
                //alert('wx.error: '+JSON.stringify(res));
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

            });

        },
        error: function(xhr,e,t) {
            alert(e);
        }
    });


    wx.ready(function(){
    	var domain = "http://huodong.medlive.cn/ys_sms/";
        var shareconfig = {
            title:"助攻神器，微信口袋报告带你飞起来",
            link: window.location.href,//和jssdk填写的域名需一致
            imgUrl: domain+"res/images/share1.jpg",//120pxX120px，实际含域名路径
            desc:"微信移动报告首秀"
        }
        //分享到朋友圈
        wx.onMenuShareTimeline(shareconfig);
        //分享给朋友
        wx.onMenuShareAppMessage(shareconfig);
        //分享到QQ
        wx.onMenuShareQQ(shareconfig);
        //分享到QQ空间
        wx.onMenuShareQZone(shareconfig);
    });
})(jQuery);