var windowTop,
    windowHeight;

module.exports =  {
    init: function() {
        this.bindings();
        this.onScroll();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.onScroll();
        }.bind(this));

        $(window).resize(function() {
            this.onScroll();
        }.bind(this));
    },

    onScroll: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();

        $('.road__photo.is-undeveloped').each(function() {
            if (windowTop > $(this).offset().top - (windowHeight / 2)) {
                $(this).removeClass('is-undeveloped').addClass('is-developed');
            }
        })
    }
};