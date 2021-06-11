function PreLoadImg(arr) {
    this.init(arr);
};

PreLoadImg.prototype = {
    init: function(arr) {
        var that = this;
        arr.forEach(function(item) {
            that.preloadItem(item);
        });
    },
    preloadItem: function(path) {
        setTimeout(function() {
            new Image().src = path;
        }, 0)
    }
}
