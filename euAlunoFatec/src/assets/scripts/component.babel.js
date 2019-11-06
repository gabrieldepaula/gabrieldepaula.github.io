const Component = {
    _components: {},

    define(name, init) {
        if (typeof this._components[name] !== 'undefined') {
            throw new Error(`The component "${name}" already exists.`);
        }

        this._components[name] = init;
    },

    init() {
        const _this = this;
        let params;

        for (let name in _this._components) {
            Array
                .from(document.querySelectorAll(`[data-component="${name}"]`))
                .forEach((el, i) => {
                    params = 'dataset' in el ? el.dataset.componentParams : el.getAttribute('data-component-params');
                    params = params ? JSON.parse(params) : {};

                    _this._components[name](el, params);
                });
        }
    },
};
