var $ = require('../vendor/jquery.js');
var snap = require('snapsvg');
var BezierEasing = require('bezier-easing');

var duration = 10000;

module.exports =  {
    init: function() {
        $(document).ready(function() {
            this.animate();
        }.bind(this))
    },

    animate: function() {
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