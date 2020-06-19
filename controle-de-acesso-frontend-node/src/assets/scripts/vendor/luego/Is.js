var Is = (function(navigator){
    var Is = {
        mobile: {
            ANDROID:    function () { return navigator.userAgent.match(/Android/i) },
            BLACKBERRY: function () { return navigator.userAgent.match(/BlackBerry/i) },
            IOS:        function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
            OPERA:      function () { return navigator.userAgent.match(/Opera Mini/i) },
            WINDOWS:    function () { return navigator.userAgent.match(/IEMobile/i) },
            ANY:        function () { return (this.ANDROID() || this.BLACKBERRY() || this.IOS() || this.OPERA() || this.WINDOWS()) }
        },
        desktop: {
            MAC: function () { return navigator.userAgent.indexOf('Mac OS X') != -1 },
            IE: function () { return navigator.userAgent.indexOf('Trident/') != -1 },
            IE10: function () { return navigator.userAgent.match(/Trident\/6\.0/) && navigator.userAgent.match(/MSIE 10\.0/) },
            IE11: function () { return navigator.userAgent.match(/Trident\/7\.0/) && navigator.userAgent.match(/rv:11\.0/) },
            FIREFOX: function () { return navigator.userAgent.match(/Gecko\//) && navigator.userAgent.match(/Firefox\//) },
            SAFARI: function () { return navigator.userAgent.match(/Version\//) && navigator.userAgent.match(/Safari\//) },
            EDGE: function () { return navigator.userAgent.match(/Edge\//) },
            CHROME: function () { return (navigator.userAgent.match(/Chrome\//) && !this.EDGE()) },
        },
        TOUCH: function () { return ('ontouchstart' in window || navigator.maxTouchPoint) }
    };

    return Is;
})(navigator);
