const Device = require('@/lib/Device.js')
const Scene = require('@/lib/Scene.js')

function Pro(setting) {
    this.xrot = 0;
    this.yrot = 0;

    this.init(setting);
    console.log('Pro init');
}

Pro.prototype = {
    init(setting) {
        this.$setting = setting;

        if(setting.scene) {
            this.$scene = new Scene(setting.scene);
        }

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function(event) {
                var revent = new Device(event);

                var a_alpha = revent.R_X,
                    B_beta = revent.R_Y,
                    Y_gamma = revent.R_z;

                if(setting.scene) {
                    if(setting.scene.type == 'css') {
                        this.$scene.driveCSS3D({
                            x: revent.R_X,
                            y: revent.R_Y,
                            z: revent.R_Z
                        })
                    }
                }
            }.bind(this), true);
        } else {
            console.error('Your Browser can\'t call the Scener')
        }
    },
};

module.exports = Pro
