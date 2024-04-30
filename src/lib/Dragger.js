function Dragger(obj) {
    this.init(obj);
}

Dragger.prototype = {
    init(obj) {
        this.xr = 0;
        this.yr = 0;

        this.$setting = obj;

        this.eventType = '';

        this._state = 0; // 0 静止；1 开始；2 拖拽；
        this._handlers = {}; // 事件对象

        this._eventsMap = {
            touch: ['touchstart', 'touchmove', 'touchend'],
            mouse: ['mousedown', 'mousemove', 'mouseup'],
        };

        if ('ontouchstart' in document) {
            this.initListener('touch');
        } else {
            this.initListener('mouse');
        }
    },
    // 构建动作函数
    _handlerBuilder() {
        var that = this;

        let startX = 0, // 开始动作x
            startY = 0, // 开始动作y
            last_x = 0, // 上次动作停止点x
            last_y = 0; // 上次动作停止点y

        return {
            startHandler(event) {
                event.preventDefault();
                event.stopPropagation();

                var ev = that.eventType === 'touch' ? event.touches[0] : event;

                startX = ev.clientX;
                startY = ev.clientY;

                that._state = 1;
            },
            moveHandler(event) {
                event.preventDefault();
                event.stopPropagation();

                if (![1, 2].includes(that._state)) {
                    return;
                }

                var ev = that.eventType === 'touch' ? event.touches[0] : event;

                var deltaX = ev.clientY - startY, // 滑动距离x
                    deltaY = ev.clientX - startX, // 滑动距离y
                    xrSpeed = deltaX / 2, // 滑动速度x
                    yrSpeed = deltaY / 2; // 滑动速度y

                that.xr = last_x + xrSpeed;
                that.yr = last_y + yrSpeed;

                that.$setting.handler && that.$setting.handler.call(that);

                that._state = 2;
            },
            endHandler(event) {
                event.preventDefault();
                event.stopPropagation();

                if (that._state !== 2) {
                    return;
                }

                last_x = that.xr;
                last_y = that.yr;

                that._state = 0;
            },
        };
    },
    initListener(eventType) {
        this.eventType = eventType;

        var eventArr = this._eventsMap[this.eventType];

        this._handlers = this._handlerBuilder();

        document.addEventListener(eventArr[0], this._handlers.startHandler, { passive: false });
        document.addEventListener(eventArr[1], this._handlers.moveHandler, { passive: false });
        document.addEventListener(eventArr[2], this._handlers.endHandler, { passive: false });
    },
    destroy() {
        var eventArr = this._eventsMap[this.eventType];

        document.removeEventListener(eventArr[0], this._handlers.startHandler);
        document.removeEventListener(eventArr[1], this._handlers.moveHandler);
        document.removeEventListener(eventArr[2], this._handlers.endHandler);

        this._handlers = {};
    },
};

module.exports = Dragger;
