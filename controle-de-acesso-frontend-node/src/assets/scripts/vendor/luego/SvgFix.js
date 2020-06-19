
(function(document, window) {
    "use strict";

    /**
    * Initialize the SVG Fixer after the DOM is ready
    */
    window.SvgFix = function() {
        var baseUrl = window.location.href.replace(window.location.hash, '');

        $('use').each(function(){
            var $this   = $(this);
            var $parent = $this.parent();
            var href    = $this.attr('xlink:href').split('#')[1];
            var $symbol = $('#' + href);

            $this.attr('xlink:href', baseUrl + '#' + href);
            $parent.attr('viewBox', $symbol.attr('viewBox'));
        });

        var baseUrl = window.location.href.replace(window.location.hash, "");

        [].slice.call(document.querySelectorAll("use[*|href]")).forEach(function(element) {
            element.setAttribute("xlink:href", baseUrl + '#' + element.getAttribute("xlink:href").split('#')[1]);
        });
    };
}(document, window));
