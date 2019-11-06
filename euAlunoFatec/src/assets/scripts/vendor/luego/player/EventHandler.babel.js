class EventHandler {
    constructor () {
        this.events = {};
    }

    on(name, fn){
        if (!this.events[name]) {
            this.events[name] = [fn];
        } else {
            this.events[name].push(fn);
        }
    };

    trigger(name, params, context){
        if (this.events[name]) {
            for (var i = 0; i < this.events[name].length; i++) {
                this.events[name][i].apply(context, [params || null]);
            }
        }
    };

    static init(O) {
        O.on = function (name, fn) {
            if (!this._event) { this._event = new EventHandler(this); }

            this._event.on(name, fn);
        };

        O.trigger = function (name, params, retroative) {
            if (!this._event) { this._event = new EventHandler(this); }

            this._event.trigger(name, params);

            if (retroative && this.parent){
                this.parent.trigger(name, params);
            }
        };
    }
}
