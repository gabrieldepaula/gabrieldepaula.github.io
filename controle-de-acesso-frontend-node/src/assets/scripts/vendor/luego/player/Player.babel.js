'use strict';



// Private

const getElements = (target, context = document) => {
    let elements = [target];

    if (typeof target === 'string') {
        elements = Array.from(context.querySelectorAll(target));
    } else if (target.length){
        elements = Array.from(target);
    }

    return elements;
};

// Global Settigns

const settings = {
    modal: false
};

class Player {

    constructor(el, userSettings = {}) {
        this.el = el;
        this.settings = Object.assign({}, settings, userSettings);

        // Player Options
        const videoId   = el.getAttribute('data-video-id');
        const playerId  = el.getAttribute('data-player-id');
        const type      = el.getAttribute('data-player-type');
        let options     = JSON.parse(el.getAttribute('data-player-options') || '{}');

        // Build Player by type
        const Driver = Player.getDriverByType(type);

        // Create Template Container
        const playerDOM = Driver.getContainer(videoId, options);

        this.el.appendChild(playerDOM);
        this.playerId = playerId;
        this.videoId = videoId;

        this.el.setAttribute('data-player-initied', 'true');

        this.driver = new Driver(playerDOM, videoId, options);

        // Set into the store
        Player.setToStore(this, playerId);
    }

    static make(el) {
        return new Player(getElements(el)[0]);
    }

    static makeAll(els) {
        return getElements(els).map(el => new Player(el));
    }

    static setToStore(driverInstance, playerId) {
        Player.store = Player.store || {};
        Player.store[playerId] = driverInstance;
    }

    static getScript (Driver) {
        const tag = 'script';
        const scriptTag = document.createElement(tag);

        scriptTag.setAttribute('async', '');
        scriptTag.setAttribute('defer', '');
        // const firstTagScript = document.getElementsByTagName(tag)[0];
        const scripts = document.body.getElementsByTagName(tag);
        const lastScriptTag = scripts[scripts.length - 1];

        return new Promise (function(resolve, reject) {
            scriptTag.src = Driver.getInfo().url;

            scriptTag.onload = () => Driver.load(resolve);
            scriptTag.onerror = () => reject();

            lastScriptTag.parentNode.appendChild(scriptTag);
        });
    };

    static add(drivers) {
        Player.drivers = Player.drivers || {};

        drivers = Array.isArray(drivers) ? drivers : [drivers];
        drivers.forEach(Driver => Player.drivers[Driver.getInfo().type] = Driver);

        return Player;
    }

    static getAllDrivers() {
        return Object
            .keys(Player.drivers)
            .map((type) => Player.drivers[type]);
    }

    static getDriverByType(type) {
        return Player.drivers[type];
    }

    static load (driversAPILoaded) {
        const driverPromises = Player
            .getAllDrivers()
            .map(Driver => Player.getScript(Driver));

        Promise
            .all(driverPromises)
            .then(driversAPILoaded)
            .catch((err) => console.error(err));
    }

    static pauseAll() {
        for (let playerId in Player.store) {
            try { Player.store[playerId].pause() } catch (e) { }
        }
    }

    play() {
        return this.driver.play();
    }

    pause() {
        return this.driver.pause();
    }

    on(event, callback) {
        this.driver.on(event, (payload) => {
            payload.playerId = this.playerId;
            callback(payload);
        });
    }
};


