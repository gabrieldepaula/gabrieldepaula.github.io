!(function (window, document, undefined) {
    'use strict';

    const $body = $('body');

    if (Is.mobile.ANY()) {
        $body.addClass('mobile');
    } else {
        $body.addClass('desktop');
    }

    if (Is.mobile.IOS()) {
        $body.addClass('ios');
    }

    if (Is.mobile.ANDROID()) {
        $body.addClass('android');
    }

    if (Is.desktop.MAC()) {
        $body.addClass('mac');
    }

    if (Is.desktop.IE()) {
        $body.addClass('ie');
    }

    if (Is.desktop.IE10()) {
        $body.addClass('ie10');
    }

    if (Is.desktop.IE11()) {
        $body.addClass('ie11');
    }

    if (Is.desktop.EDGE()) {
        $body.addClass('edge');
    }

    if (Is.desktop.CHROME()) {
        $body.addClass('chrome');
    }

    if (Is.desktop.FIREFOX()) {
        $body.addClass('firefox');
    }

    if (Is.desktop.SAFARI()) {
        $body.addClass('safari');
    }
})(window, document, undefined);