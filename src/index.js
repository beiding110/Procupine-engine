const Device = require('@/lib/Device.js');
const Scene = require('@/lib/Scene.js');
const Marks = require('@/lib/Marks');
const Dragger = require('@/lib/Dragger.js');

function Pro(setting) {
    this.xrot = 0;
    this.yrot = 0;
    this.zrot = 0;

    this.eventer = null;

    this.init(setting);
    console.log('Pro init');
}

Pro.prototype = {
    init(setting) {
        this.$setting = setting;
        var that = this;

        if (setting.scene) {
            this.$scene = new Scene(setting.scene);
        }

        if (setting.marks) {
            this.$marks = new Marks(setting.marks);
        }

        if (this.$setting.mode === 'drag') {
            this.switchModel('drag');
        } else {
            this.switchModel('orientation');
        }
    },
    update(obj) {
        this.xrot = obj.x;
        this.yrot = obj.y;
        this.zrot = obj.z;

        if (this.$setting.scene) {
            if (this.$setting.scene.type == 'css') {
                this.$scene.driveCSS3D({
                    x: obj.x,
                    y: obj.y,
                    z: obj.z,
                });
            }
        }

        if (this.$setting.marks) {
            this.$marks.driveCSS3D({
                x: obj.x,
                y: obj.y,
                z: obj.z,
            });
        }

        this.$setting.handler &&
            this.$setting.handler({
                x: this.xrot,
                y: this.yrot,
                z: this.zrot,
            });
    },
    switchModel(type, success, failed) {
        var that = this;

        try {
            that.eventer.destroy();
        } catch (e) {}

        var switchObj = {
            drag() {
                that.eventer = new Dragger({
                    handler: function () {
                        that.update({
                            x: +this.xr,
                            y: -this.yr,
                            z: 0,
                        });
                    },
                });

                that.$setting.mode = 'drag';

                success && success();
            },
            orientation() {
                if (!window.DeviceOrientationEvent) {
                    initDrag();
                    
                    return;
                }

                if(typeof DeviceMotionEvent.requestPermission === 'function') {
                    // 如果是ios，则需要授权
                    DeviceMotionEvent.requestPermission().then(function (state) {
                        if ('granted' === state) {
                            // 用户同意
                            initOrientation();
                        } else {
                            // 用户不同意
                            initDrag();
                        };
                    }).catch(function(err){
                        alert('error: ' + err);

                        initDrag();
                    });
                } else {
                    // 非iso，正常初始化
                    initOrientation();
                };

                function deviceorientationHandler(event) {
                    var revent = new Device(event);

                    that.update({
                        x: revent.R_X,
                        y: revent.R_Y,
                        z: revent.R_Z,
                    });

                    revent = null;
                }

                // 初始化角度传感器
                function initOrientation() {
                    window.addEventListener('deviceorientation', deviceorientationHandler);

                    that.eventer = {
                        destroy() {
                            window.ondeviceorientation = null;

                            window.removeEventListener('deviceorientation', deviceorientationHandler);
                        },
                    };

                    that.$setting.mode = 'orientation';

                    success && success();
                }

                // 初始化拖拽
                function initDrag () {
                    console.error('您的浏览器不支持相关传感器的调用，已为您打开拖拽模式');
                    that.switchModel('drag');

                    failed && failed();
                }
            },
        };

        switchObj[type]();
    },
};

module.exports = Pro;
