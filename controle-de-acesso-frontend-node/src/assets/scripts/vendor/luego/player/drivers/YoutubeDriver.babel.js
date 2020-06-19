'use strict';

/*
    https://developers.google.com/youtube/iframe_api_reference?hl=pt-br
*/
const YoutubeDriver = (() => {

    const defaultOptions = {
        autoplay: '0',
        cc_load_policy: '0',
        color: 'red',
        controls: '1',
        enablejsapi: '1',
        fs: '1',
        hl: 'pt',
        iv_load_policy: '3',
        loop: '0',
        modestbranding: '1',
        origin: location.origin,
        playsinline: '1',
        rel: '0',
        showinfo: '0'
    };

    class YoutubeDriver extends InterfacePlayer {

        constructor(el, videoId, options) {
            super(el, videoId, options);

            const payload = {
                videoId
            };

            this.player = new YT.Player(this.el, {
                videoId,
                height: '100%',
                width: '100%',
                playerVars: Object.assign({}, defaultOptions, options),
                events: {
                    onReady: (e) => { },
                    onStateChange: (e) => {
                        switch (e.data) {
                            case YT.PlayerState.PLAYING: this.trigger('playing', payload); break;
                            case YT.PlayerState.PAUSED: this.trigger('paused', payload); break;
                            case YT.PlayerState.ENDED: this.trigger('ended', payload); break;
                            case YT.PlayerState.BUFFERING: this.trigger('buffering', payload); break;
                            case YT.PlayerState.CUED: this.trigger('cued', payload); break;
                        }
                    }
                }
            });
        }

        static template(videoId, options) {
            return `<div id="${videoId}"></div>`;
        }

        static getContainer(videoId, options) {
            const template = document.createElement('template');
            template.insertAdjacentHTML('beforeend', YoutubeDriver.template(videoId, options))
            return template.firstElementChild;
        }

        static getInfo() {
            return {
                type: 'youtube',
                url: 'https://www.youtube.com/iframe_api',
            };
        }

        static load(resolve) {
            window.onYouTubeIframeAPIReady = () => resolve();
        }

        play() {
            this.player.playVideo();
        }

        pause() {
            this.player.pauseVideo();
        }
    }

    return YoutubeDriver;

})();
