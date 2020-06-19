'use strict';

const $window   = $(window);
const $document = $(document);
const $body     = $('body');

let wW          = $window.outerWidth();
let wH          = $window.outerHeight();
let dH          = $document.outerHeight();

$document.on('preloaded.after', function () {
    $window
        .on('scroll', function () {
            if (!Is.mobile.ANY()) {
                Animator.onScroll();
            }

            if (typeof Navigation !== 'undefined') { Navigation.onScroll(); }
        })
        .trigger('scroll');
});

$document.on('preloaded.before', function () {
    $window
        .on('resize', function () {
            wW = $window.outerWidth();
            wH = $window.outerHeight();
            dH = $document.outerHeight();
        });

    Component.init();

    if (typeof Navigation !== 'undefined') { Navigation.init(); }

    $('img[data-src]').lazyload({ data_attribute: 'src', effect : 'fadeIn' });

    // Add your code here

    $window.trigger('resize').trigger('popstate');
});

$body.waitForImages(true)
    .progress((loaded, count, success) => {
        count++;

        let percent = (loaded * 100 / count);

        TweenLite.to('.preloader__bar__progress', .4, { width: percent+'%', ease: Power2.easeInOut });
    })
    .done(() => {
        TweenLite.to('.preloader__bar__progress', .3, { width: '100%', onComplete: () => {
            $document.trigger('preloaded.before');

            TweenLite.to('.preloader', .2, { opacity: 0, display: 'none', ease: Linear.easeNone, onComplete: () => $document.trigger('preloaded.after') });
        } });
    });
