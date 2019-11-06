const hasPassiveEvents = (function () {
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        let passive = false;

        const options = Object.defineProperty({}, 'passive', {
            get() { passive = true; },
        });

        const noop = () => {};
        window.addEventListener('testPassiveEventSupport', noop, options);
        window.removeEventListener('testPassiveEventSupport', noop, options);
        return passive;
    }
})();