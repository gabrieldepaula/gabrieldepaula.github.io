'use strict';

!(function (window, document, undefined) {
    'use strict';

    let $document   = $(document);
    let $body       = $('body');

    $document.on('video.apply', function () {
        Player.makeAll('[data-player-id]:not([data-player-initied])').forEach(player => {
            if (!$(player.el).parents('.slick-cloned').length) {

                player.on('playing', (payload) => {
                    $document.trigger('video.playing', payload);
                });

                player.on('paused', (payload) => {
                    $document.trigger('video.paused', payload);
                });

                player.on('ended', (payload) => {
                    $document.trigger('video.ended', payload);
                });

            }
        });
    });

    $document.on('preloaded.after', function () {
        Player.add([
            YoutubeDriver,
            FacebookDriver,
            VimeoDriver,
        ]).load(() => $document.trigger('video.apply'));

        $body.on('click', '[data-player-play]', function (e) {
            var playerID = $(this).attr('data-player-play');

            Player.pauseAll();
            $document.trigger('tracking:video-play', [playerID]);

            Player.store[playerID].play();
        });
    });
})(window, document, undefined);
