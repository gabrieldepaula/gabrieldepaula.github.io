class InterfacePlayer extends EventHandler {

    constructor(el, videoId, options) {
        super();
        this.el         = el;
        this.videoId    = videoId;
        this.options    = options;

        this.player     = null;
    }

    static getInfo () {
        return {
            type: '',
            url: '',
        };
    }

    static template(videoId, options) {
        return `<div id="${ videoId }"></div>`;
    }

    static getContainer(videoId, options) {
        const template = document.createElement('template');
        template.insertAdjacentHTML('beforeend', InterfacePlayer.template(videoId, options))
        return template.firstElementChild;
    }

    static load(resolve) {
        resolve();
    }

    play() {}
    pause() {}
}
