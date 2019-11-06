(function($){
    $.fn.isOnScreen = function(p){
        var $this        = $(this);
        var $window      = $(window);
        var windowHeight = $(window).height();
        var scrollTop    = $(window).scrollTop();
        var top          = $this.offset().top;
        var height       = $this.height();
        return ((scrollTop + windowHeight - p) >= top && scrollTop < (top + height + p));
    };

    $.fn.isOnScreenPercent = function(p){
        var $this        = $(this);
        var $window      = $(window);
        var windowHeight = $(window).height();
        var scrollTop    = $(window).scrollTop();
        var top          = $this.offset().top;
        var height       = $this.height();
        return (scrollTop + windowHeight * p) >= top;
    };
})(jQuery);
