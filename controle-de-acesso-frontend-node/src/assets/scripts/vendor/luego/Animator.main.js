;var Animator = (function(window, document, undefined, $){
    var Animator = {
        _smController: new ScrollMagic.Controller(),
        _animations: {},
        _wait: { global: 0 },

        add: function(type, method){
            this._animations[type] = method;
        },
        onScroll: function($el) {
            var _this = this;

            $('[data-ani-type^="sm-"]:not([data-animated])').each(function () {
                var $this       = $(this);
                var type        = $this.attr('data-ani-type');
                var element     = $this.attr('data-ani-sm-trigger-el')   || $this.parent().get(0);
                var hook        = $this.attr('data-ani-sm-trigger-hook') || 'onLeave';
                var duration    = $this.attr('data-ani-sm-duration')     || '100%';

                new ScrollMagic.Scene({
                    triggerElement: element,
                    triggerHook: hook,
                    duration: duration
                })
                .setTween(_this._animations[type]($this))
                .addTo(_this._smController);

                $this.attr('data-animated', 'true');
            });

            $('[data-ani-type]:not([data-animated], [data-ani-type^="sm-"])').each(function(i){
                var $this   = $(this),
                    type    = $this.attr('data-ani-type'),
                    group   = $this.attr('data-ani-group') || 'global',
                    p       = $this.attr('data-ani-show')  || 100,
                    delay   = $this.attr('data-ani-delay') || .2,
                    time    = $this.attr('data-ani-time')  || .5;

                if (p.toString().indexOf('%') !== -1) {
                    p = parseFloat(p.replace('%', ''));
                    p = $this.height() * p;
                }

                if (typeof _this._wait[group] == 'undefined') {
                    _this._wait[group] = 0;
                }

                delay = parseFloat(delay);

                if (typeof _this._animations[type] === 'undefined') {
                    throw new Error('Animator does not have a "'+type+'" animation configured.');
                } else {
                    if ($this.parents('.slick-slide').length === 0 || $this.parents('.slick-slide').is('.slick-active')) {
                        if ($this.isOnScreen(p)) {
                            $this.attr('data-animated', 'waiting');
                            _this._wait[group] += delay;

                            setTimeout(function() {
                                _this._animations[type]($this, time);
                                _this._wait[group] -= delay;

                                $this.attr('data-animated', 'true');
                            }, _this._wait[group] * 1000);
                        }
                    }
                }
            });
        }
    };

    return Animator;
})(window, document, undefined, jQuery);
