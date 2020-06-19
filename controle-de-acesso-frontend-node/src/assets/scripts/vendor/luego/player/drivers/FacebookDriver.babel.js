'use strict';

/*
    https://developers.facebook.com/docs/plugins/embedded-video-player
*/

const FacebookDriver = (() => {

    const defaultOptions = {
        autoplay: 'false',
        width: 'auto',
        showtext: 'false',
        showcaptions: 'false',
        allowfullscreen: 'true',
    };

    class FacebookDriver extends InterfacePlayer {

        constructor(el, videoId, options) {
            super(el, videoId, options);

            FB.XFBML.parse(this.el.parentNode);

            FB.Event.subscribe('xfbml.ready', player => {
                if (!this.player && player.type === 'video' && player.id === videoId) {
                    this.player = player.instance;

                    const payload = {
                        videoId
                    };

                    this.player.subscribe('startedPlaying', () => this.trigger('playing', payload));
                    this.player.subscribe('paused', () => this.trigger('paused', payload));
                    this.player.subscribe('finishedPlaying', () => this.trigger('ended', payload));
                    this.player.subscribe('startedBuffering', () => this.trigger('buffering', payload));
                    this.player.subscribe('finishedBuffering', () => this.trigger('bufferend', payload));
                    this.player.subscribe('error', () => this.trigger('error', payload));
                }
            });
        }

        static template(videoId, options) {
            const {
                channel,
                autoplay,
                width,
                showtext,
                showcaptions,
                allowfullscreen,
            } = Object.assign({}, defaultOptions, options);

            return `
                <div
                    class="fb-video"
                    id="${videoId}"
                    data-href="https://www.facebook.com/${channel}/videos/${videoId}/"
                    data-autoplay="${autoplay}"
                    data-width="${width}"
                    data-show-text="${showtext}"
                    data-show-captions="${showcaptions}"
                    data-allowfullscreen="${ allowfullscreen }">
                </div>
            `;
        }

        static getContainer(videoId, options) {
            const template = document.createElement('template');
            template.insertAdjacentHTML('beforeend', FacebookDriver.template(videoId, options))
            return template.firstElementChild;
        }

        static getInfo () {
            return {
                type: 'facebook',
                url: 'https://connect.facebook.net/en_US/sdk.js#version=v3.2',
            };
        }

        static load(resolve) {
            window.fbAsyncInit = () => resolve();
        }

        play() {
            this.player.play();
        }

        pause() {
            this.player.pause();
        }
    }

    return FacebookDriver;

})();
