!(function (window, document, undefined) {
    'use strict';

    const $window = $(window);
    const $document = $(document);

    const translate = {
        'index': 'home',
    };

    const page = translate[$body.prop('id')];

    const trackEvent = (selector, event, trackEvent, trackCategory, trackLabel) => {
        $(selector).on(event, function () {
            if (typeof gtag !== "undefined") {
                gtag('event', trackEvent, { 'event_category': trackCategory, 'event_label': trackLabel });
            }
        });
    };

    const scrollCheckpoints = [25, 50, 75, 100];

    let scrollCurrentCheckpoint = 0;

    $window.on('scroll', function () {
        const scrollTop = $window.scrollTop();
        const percent = scrollTop / ($document.height() - $window.height()) * 100;

        if (percent > scrollCurrentCheckpoint) {
            const checkpoint = scrollCheckpoints.reduce((accumulator, currentValue) => {
                return percent >= currentValue ? currentValue : accumulator;
            }, 0);

            if (checkpoint !== scrollCurrentCheckpoint) {
                $document.trigger('luego-scroll-depth', [checkpoint]);

                scrollCurrentCheckpoint = checkpoint;
            }
        }
    });

    $document.on('luego-scroll-depth', function (e, checkpoint) {
        if (typeof gtag !== "undefined") {
            gtag('event', 'Scroll', { 'event_category': page, 'event_label': checkpoint });
        }
    });

    // Code here

})(window, document, undefined);
