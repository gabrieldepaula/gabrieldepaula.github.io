const Navigation = {
    _firstLoad: true,
    _scrollingTo: false,
    _selector: 'a:not([href="#"], [href^="javascript:void(0)"])',
    _routes: {},

    onScroll() {
        if (!Navigation._scrollingTo) {
            let $currentPage = null;

            $('[data-url]:visible').each(function () {
                let $this = $(this);
                let $parent = $this.parents('[data-url]');

                if ($parent.length) {
                    if ($parent.isOnScreenPercent(.5)) {
                        $currentPage = $this;
                    }
                } else {
                    if ($this.isOnScreenPercent(.5)) {
                        $currentPage = $this;
                    }
                }
            });

            if ($currentPage) {
                Navigation.setURL($currentPage.attr('data-url'), 0);
            }
        }
    },

    init() {
        SvgFix();

        $body.on('click', Navigation._selector, function (e) {
            const $this = $(this);
            const url = Navigation.cleanURL($this.attr('href'));

            if ($(`[data-url="${url}"]`).length && Navigation.getRoute(url)) {
                e.preventDefault();

                Navigation.setURL(url, 2);
            }
        });

        $window.on('popstate', function (e) {
            Navigation.parse();
            Navigation._firstLoad = false;
        });
    },

    cleanURL(url) {
        let baseUrl = base.indexOf('http') === 0 ? base.replace(window.location.origin, '') : base;

        url = url.indexOf('http') === 0 ? url.replace(window.location.origin, '') : url;
        url = url.replace(new RegExp(`^${baseUrl}`), '').replace(window.location.hash, '').replace(window.location.search, '').replace(/^\/+/, '').replace(/\/+$/, '');

        return url ? `${url}/` : './';
    },

    getURL() {
        return this.cleanURL(window.location.href);
    },

    setURL(url, trigger = 1) {
        const currentURL = this.getURL();

        const queryString = window.location.search;

        url = this.cleanURL(url);

        if (currentURL != url || trigger === 2) {
            history.pushState({}, '', url + (queryString ? queryString : ''));

            SvgFix();

            this.helpers.markMenuActive(url);

            if (trigger !== 0) {
                $window.trigger('popstate');
                $body.trigger('page.open');
            }
        }
    },

    go(url) {
        this.setURL(url);
        this.parse();
    },

    getRoute(url) {
        const PARAMS = {
            PARAMETER_REGEXP: /([:*])(\w+)/g,
            WILDCARD_REGEXP: /\*/g,
            REPLACE_VARIABLE_REGEXP: '([^\/]+)',
            REPLACE_WILDCARD: '(?:.*)',
            FOLLOWED_BY_SLASH_REGEXP: '',
            MATCH_REGEXP_FLAGS: '',
        };

        function clean(s) {
            if (s instanceof RegExp) return s;
            return s.replace(/\/+$/, '').replace(/^\/+/, '');
        }

        function regExpResultToParams(match, names) {
            if (names.length === 0) return null;
            if (!match) return null;

            return match
                .slice(1, match.length)
                .reduce((params, value, index) => {
                    if (params === null) params = {};
                    params[names[index]] = decodeURIComponent(value);
                    return params;
                }, null);
        }

        function replaceDynamicURLParts(route) {
          var paramNames = [], regexp;

          if (route instanceof RegExp) {
            regexp = route;
          } else {
            regexp = new RegExp(
                '^' +
                route
                .replace(PARAMS.PARAMETER_REGEXP, function (full, dots, name) {
                    paramNames.push(name);
                    return PARAMS.REPLACE_VARIABLE_REGEXP;
                })
                .replace(PARAMS.WILDCARD_REGEXP, PARAMS.REPLACE_WILDCARD)
                + '$'
            , PARAMS.MATCH_REGEXP_FLAGS);
          }

          return { regexp, paramNames };
        }

        for (let route in this._routes) {
            let { regexp, paramNames } = replaceDynamicURLParts(this.cleanURL(route));
            let match = url.match(regexp);

            if (match) {
                let params = regExpResultToParams(match, paramNames);

                return this._routes[route].bind(this, url, params);
            }
        }
    },

    parse() {
        const url = this.getURL();
        const route = this.getRoute(url);

        if (route) {
            this.helpers.markMenuActive(url);

            route();
        }
    },

    on(route, cb) {
        this._routes[route] = cb;
    },

    helpers: {
        markMenuActive(url) {
            url = Navigation.cleanURL(url);

            $('.-url-active').removeClass('active').removeClass('-url-active');
            $(`[href="${url}"]`).addClass('active').addClass('-url-active');
        },

        scrollTo(url) {
            Navigation._scrollingTo = true;

            $window.trigger('resize');

            const $header = $('[data-component="header"]');
            const maxY = dH - wH;

            let y;

            if (typeof url == 'number') {
                y = url;
            } else {
                let $page = typeof url == 'string' ? $(`[data-url="${url}"]`) : url;

                y = $page.offset().top - $header.innerHeight();
            }

            y = y < 0 ? 0 : y;
            y = y > maxY ? maxY : y;

            Scroll.y = y;

            let onComplete = function () { Navigation._scrollingTo = false; };

            TweenLite.killTweensOf($window);
            TweenLite.to($window, Navigation._firstLoad ? 0 : .8, {
                scrollTo: { y: y, autoKill: false },
                ease: Power2.easeOut,
                onComplete: onComplete,
                onOverwrite: onComplete,
            });
        },
    },
};