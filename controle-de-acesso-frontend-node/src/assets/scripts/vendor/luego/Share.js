;var Share = (function(){
    var Share = {};

    Share.whatsapp = function whatsapp(url){
         window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(url));
    };

    Share.facebook = function facebook(url){
         var winWidth = 566;
         var winHeight = 436;

         var winTop = (screen.height / 2) - (winHeight / 2);
         var winLeft = (screen.width / 2) - (winWidth / 2);

         window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    };

    Share.twitter = function twitter(url, descr){
        var winWidth = 660;
        var winHeight = 260;

        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('https://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(descr), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    };

    Share.linkedin = function linkedin(url, title, descr){
        var winWidth = 626;
        var winHeight = 436;

        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);

        window.open('http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(descr), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    };

    Share.googlePlus = function googlePlus(url){
        var winWidth = 510;
        var winHeight = 436;

        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);

        window.open('https://plus.google.com/share?url='+encodeURIComponent(url), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);
    };

    return Share;
}());
