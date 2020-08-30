function Dragger(obj) {
    this.init(obj);
}

Dragger.prototype = {
    init(obj) {
        this.xr = 0;
        this.yr = 0;
        this.xr_sum = 0;
        this.yr_sum = 0;
        this.$setting = obj;

        this.last_x = 0;
        this.last_y = 0;

        this.eventType = '';

        var that = this;

        if('ontouchstart' in document) {
            this.initListener('touch');
        } else {
            this.initListener('mouse');
        }
    },
    initListener(eventType) {
        this.eventType = eventType;

        var eventArr = ['ontouchstart', 'ontouchmove', 'ontouchend'],
            that = this;
        if(eventType === 'mouse') {
            eventArr = ['onmousedown', 'onmousemove', 'onmouseup'];
        };

        document[eventArr[0]] = function(event) {
            event.preventDefault();
            var ev = eventType === 'touch' ? event.touches[0] : event;

            var disX = ev.clientX;
            var disY = ev.clientY;

            document[eventArr[1]] = function(event) {
                event.preventDefault();
                var ev = eventType === 'touch' ? event.touches[0] : event;

                var x = ev.clientY - disY,
                    y = ev.clientX - disX;

                that.xr = x / 2;
                that.yr = y / 2;

                that.xr_sum = that.last_x + that.xr;
                that.yr_sum = that.last_y + that.yr;
                that.$setting.handler && that.$setting.handler.call(that);
            };
            document[eventArr[2]] = function() {
                document[eventArr[1]] = null;
                document[eventArr[2]] = null;

                that.last_x = that.xr_sum;
                that.last_y = that.yr_sum;

                console.log(that.last_x, that.last_y)
            };
            return false;
        };
    },
    destroy() {
        var switchObj = {
            touch: ['ontouchstart', 'ontouchmove', 'ontouchend'],
            mouse: ['onmousedown', 'onmousemove', 'onmouseup']
        };

        switchObj[this.eventType].forEach(item => {
            document[item] = null;
        });
    }
};

module.exports = Dragger;
