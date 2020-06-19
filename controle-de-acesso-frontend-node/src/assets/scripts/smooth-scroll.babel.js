!(function (window, document, undefined) {
    'use strict';

    const $window = $(window);
    const $document = $(document);

    const Scroll = {
        y: $document.scrollTop(),
        inAnimation: false,
        canScroll: true,
        step: 80,
    };

    window.addEventListener('wheel', function (event) {
        if (!Scroll.canScroll) {
            event.preventDefault();
            return false;
        }

        if (!Is.mobile.ANY() && !Is.desktop.MAC() && !$body.is('.modal-opened') && !$body.is('.pause-scroll')) {
            event.preventDefault();

            const maxScroll = $document.height() - $window.height();
            const delta = event.deltaY > 0 ? -1 : 1;

            Scroll.y -= parseInt(delta * Scroll.step);
            Scroll.y = Math.max(0, Scroll.y);
            Scroll.y = Math.min(maxScroll, Scroll.y);

            TweenLite.killTweensOf(this);
            TweenLite.to(this, .8, {
                scrollTo : { y: Scroll.y },
                ease: Power2.easeOut,
                onStart:     () => Scroll.inAnimation = true,
                onOverwrite: () => Scroll.inAnimation = false,
                onComplete:  () => Scroll.inAnimation = false,
            });
        }
    }, hasPassiveEvents ? { passive: false } :  false);

    window.addEventListener('scroll', function (event) {
        if (!Scroll.inAnimation) {
            Scroll.y = $window.scrollTop();
        }
    }, hasPassiveEvents ? { passive: false } :  false);

    window.Scroll = Scroll;
})(window, document, undefined);
