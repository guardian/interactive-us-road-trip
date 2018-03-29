var $ = require('../vendor/jquery.js');

var photos = [];

module.exports =  {
    init: function() {
        this.createCanvasses();
    },

    createCanvasses: function() {
        canvasses = document.getElementsByClassName('road__image');

        for (var i = 0; i < canvasses.length; i++) {
            photos[i] = {};
            photos[i].canvas = canvasses[i];
            this.setupCanvas(i);
            this.loadImage(i);
        }
    },

    setupCanvas: function(i) {
        size = photos[i].canvas.clientWidth;
        photos[i].size = size;
        photos[i].canvas.width = size;
        photos[i].canvas.height = size;
        photos[i].ctx = photos[i].canvas.getContext('2d');
    },

    loadImage: function(i) {
        var image = new Image();
        image.onload = function() {
            photos[i].image = image;
            this.generateImages(i);
        }.bind(this);
        image.src = $(photos[i].canvas).data('image');
    },

    generateImages: function(i) {
        photos[i].ctx.clearRect(0, 0, photos[i].size, photos[i].size);
        photos[i].ctx.drawImage(photos[i].image, 0, 0, photos[i].size, photos[i].size);
        var imgData = photos[i].ctx.getImageData(0, 0, photos[i].size, photos[i].size);

        photos[i].originalImage = imgData;

        var newImgData = photos[i].ctx.getImageData(0, 0, photos[i].size, photos[i].size);
        var data = newImgData.data;

        for (var d = 0; d < data.length; d += 4) {
            var grey = (0.2126 * data[d]) + (0.7152 * data[d + 1]) + (0.0722 * data[d + 2]);
            data[d] = grey;
            data[d + 1] = grey;
            data[d + 2] = grey;
        }

        photos[i].treatedImage = newImgData;

        this.animate(i);
    },

    animate: function(i) {
        this.draw(i);
    },

    draw: function(i) {
        photos[i].ctx.clearRect(0, 0, photos[i].size, photos[i].size);
        photos[i].ctx.putImageData(photos[i].treatedImage, 0, 0);
    }
};