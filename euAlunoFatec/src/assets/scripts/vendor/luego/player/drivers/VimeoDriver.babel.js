'use strict';

/*
    https://developer.vimeo.com/player/sdk/reference#methods-for-playback-controls

    Methods

    Get the autopause state of a player or browser
    Get the playback position of a video
    Get the duration of a video
    Get the ended state of a video
    Get the loop state of a player
    Get the pause state of a player
    Get the playback rate of a player
    Get the volume level of a player
    Pause a video [OK]
    Play a video [OK]
    Set the autopause state of a player or browser
    Set the playback position of a video
    Set the loop state of a player
    Set the playback rate of a player
    Set the volume level of a player

    Events

    bufferend [OK]
    bufferstart [OK]
    ended [OK]
    error [OK]
    loaded
    pause [OK]
    play [OK]
    playbackratechange
    progress
    seeked
    timeupdate
    volumechange
*/
const VimeoDriver = (() => {

    const message = `
        The Vimeo Player SDK works with any of the following browsers:
        Microsoft Edge, Internet Explorer 11 or better, Chrome, Firefox, Safari, and Opera.
    `;

    if (navigator.userAgent.includes('MSIE 10.0')) {
        throw new Error(message);
    }

    const defaultOptions = {
        autopause: false,
        autoplay: false,
        background: false,
        byline: false,
        color: '#00ADEF',
        height: '100%',
        loop: false,
        maxheight: '100%',
        maxwidth: '100%',
        muted: false,
        playsinline: true,
        portrait: true,
        speed: false,
        title: true,
        transparent: true,
        width: '100%',
    };

    class VimeoDriver extends InterfacePlayer {

        constructor(el, videoId, options) {
            super(el, videoId, options);

            const payload = {
                videoId
            };

            this.player = new Vimeo.Player(
                this.el,
                Object.assign({}, defaultOptions, options, {
                    id: videoId,
                })
            );

            this.player.on('play', () => this.trigger('playing', payload));
            this.player.on('pause', () => this.trigger('paused', payload));
            this.player.on('ended', () => this.trigger('ended', payload));
            this.player.on('bufferstart', () => this.trigger('buffering', payload));
            this.player.on('bufferend', () => this.trigger('bufferend', payload));
            this.player.on('error', () => this.trigger('error', payload));
        }

        static template(videoId, options) {
            return `<div id="${videoId}"></div>`;
        }

        static getContainer(videoId, options) {
            const template = document.createElement('template');
            template.insertAdjacentHTML('beforeend', VimeoDriver.template(videoId, options))
            return template.firstElementChild;
        }

        static getInfo () {
            return {
                type: 'vimeo',
                url: 'https://player.vimeo.com/api/player.js',
            };
        }

        static load(resolve) {
            resolve();
        }

        play() {
            this.player.play();
        }

        pause() {
            this.player.pause();
        }
    }

    return VimeoDriver;
})();
