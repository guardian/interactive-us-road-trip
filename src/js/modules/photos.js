var $ = require('../vendor/jquery.js');

var canvas, W, H, ctx;

module.exports =  {
    init: function() {
        this.createCanvas();
        this.bindings();
    },

    bindings: function() {
        
    },

    createCanvas: function() {
        canvas = document.getElementsByClassName('road__image')[0];
        console.log(canvas);
        this.setCanvasSize();
        ctx = canvas.getContext('2d');

        this.loadImage();
    },

    setCanvasSize: function() {
        W = canvas.clientWidth;
        H = canvas.clientWidth;
        canvas.width = W;
        canvas.height = H;
    },

    loadImage: function() {
        var image = new Image();
        image.onload = function() {
            this.draw(image);
        }.bind(this);
        image.src = $('.road__image').data('image');
    },

    draw: function(image) {
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(image, 0, 0, W, H);
        var imgData = ctx.getImageData(0, 0, W, H);
        var data = imgData.data;

        for (var i = 0; i < data.length; i += 4) {
            var grey = (0.2126 * data[i]) + (0.7152 * data[i + 1]) + (0.0722 * data[i + 2]);
            data[i] = grey;
            data[i + 1] = grey;
            data[i + 2] = grey;
        }

        ctx.putImageData(imgData, 0, 0);
    },
};