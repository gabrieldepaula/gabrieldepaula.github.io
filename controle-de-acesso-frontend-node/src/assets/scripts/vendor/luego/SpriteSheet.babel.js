(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

const Ticker = {
    _items: [],
    _paused: false,

    time: {
        last: 0,
        now: 0,
        dt: 0,
        elapsed: 0,
    },

    add(item) {
        this._items.push(item);
    },

    pause() {
        this._paused = true;
    },

    resume() {
        this._paused = false;
    },

    timestamp() {
        return ((window.performance && window.performance.now) ? window.performance.now() : new Date().getTime());
    },

    tick() {
        this.time.now     = this.timestamp();
        this.time.dt      = Math.min(1, (this.time.now - this.time.last) / 1000);
        this.time.elapsed += this.time.dt;

        if (!this._paused) {
            for (let i = 0, len = this._items.length; i < len; i++) {
                let item = this._items[i];
                item.tick(this.time.dt);
            }
        }

        this.time.last    = this.time.now;

        requestAnimationFrame(this.tick.bind(this));
    },

    init() {
        this._paused = false;
        requestAnimationFrame(this.tick.bind(this));
    },
};

class SpriteSheet {
    constructor(el, data, fps = 24) {
        el = typeof el == 'string' ? document.querySelector(el) : el;

        if (!el) return false; // TODO: Return a log error

        const _images = {};
        const _data   = [];

        for (let i = 0, len = data.animations.default.frames.length; i < len; i++) {
            const frame = data.frames[data.animations.default.frames[i]];
            const item = {
                image: data.images[frame[4]],
                sx: Math.round(frame[0]),
                sy: Math.round(frame[1]),
                swidth: Math.round(frame[2]),
                sheight: Math.round(frame[3]),
                x: -Math.round(frame[5]),
                y: -Math.round(frame[6]),
            };

            if (typeof _images[item.image] === 'undefined') {
                const img = new Image();
                img.src = item.image;

                _images[item.image] = img;
            }

            _data.push(item);
        }

        this.time           = { elapsed: 0 };

        this.el             = el;
        this.fps            = 1 / fps;
        this.images         = _images;
        this.data           = _data;
        this.oldFrame       = -1;
        this.currentFrame   = 0;
        this.totalFrames    = this.data.length;
        this._paused        = true;
        this._repeat        = -1;
        this._events        = {};

        this._canvas        = document.createElement('canvas');
        this._ctx           = this._canvas.getContext('2d');


        this._canvas.width  = data.width;
        this._canvas.height = data.height;
        this._canvas.style.maxWidth = `${data.width}px`;
        this._canvas.style.maxHeight = `${data.height}px`;

        this.el.style.backgroundImage = 'none';
        this.el.appendChild(this._canvas);

        $(this.el).data('ss', this);

        Ticker.add(this);
    }

    tick(dt) {
        if (!this._paused) {
            this.time.elapsed += dt;

            if (this.time.elapsed >= this.fps) {
                this.next();
            }

            if (this.oldFrame != this.currentFrame) {
                this.draw(this.currentFrame);
            }
        }
    }

    draw(_frame) {
        const frame = this.data[_frame];

        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.drawImage(this.images[frame.image], frame.sx, frame.sy, frame.swidth, frame.sheight, frame.x, frame.y, frame.swidth, frame.sheight);

        this.oldFrame = this.currentFrame;
    }

    setFps(fps) {
        this.fps = 1 / fps;
    }

    one() {
        this.repeat(1);
    }

    loop(first = 0, last = -1) {
        last = last === -1 ? this.totalFrames - 1 : last;

        this.goto(first);
        this.on(last, () => this.goto(first));
        this.repeat(-1);
    }

    repeat(n) {
        this._repeat = n;
        this.play();
    }

    paused() {
        return this._paused;
    }

    play() {
        this._paused = false;
    }

    stop() {
        this._paused = true;
    }

    next() {
        this.goto(this.currentFrame + 1);
    }

    prev() {
        this.goto(this.currentFrame - 1);
    }

    goto(frame) {
        this.time.elapsed = 0;


        if (frame >= (this.totalFrames)) {
            if (--this._repeat === 0) {
                this._paused = true;

                this.trigger('complete');

                return false;
            }

            this.trigger('repeat', this._repeat);

            this.currentFrame = frame % (this.totalFrames);
            this.trigger(this.currentFrame);
        } else {
            this.currentFrame = frame % (this.totalFrames);
            this.trigger(this.currentFrame);
        }
    }

    gotoAndPlay(frame) {
        this.goto(frame);
        this.play();
    }

    gotoAndStop(frame) {
        this.goto(frame);
        this.stop();
    }

    on(frame, cb) {
        if (typeof this._events[frame] === 'undefined') {
            this._events[frame] = [];
        }

        this._events[frame].push(cb);
    }

    trigger(frame, ...params) {
        if (typeof this._events[frame] !== 'undefined') {
            const callbacks = this._events[frame];

            for (let i = 0, l = callbacks.length; i < l; i++) {
                callbacks[i].apply(this, params);
            }
        }
    }
}
