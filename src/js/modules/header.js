var snap = require('../vendor/snap.js');
var BezierEasing = require('bezier-easing');

var duration = 10000;

module.exports =  {
    init: function() {
        this.loadImage();
    },

    loadImage: function() {
        $.ajax({
            url: '@@assetPath@@/assets/images/map.svg',
            type: 'GET',
            dataType: 'text',
            success: function(data) {
                $('.road__header-map').append(data);
                this.animate();
            }.bind(this)
        });
    },

    animate: function() {
        console.log('animating');
        var s = snap('#svg');

        $('.road__header-map').addClass('is-animating');

        setTimeout(function() {
            s.select('#route')
            .animate({
                    strokeDashoffset: 0,
                },
                duration,
                BezierEasing(0, 0, 0.3, 1)
            );
         }.bind(this), 1500)
    }
};