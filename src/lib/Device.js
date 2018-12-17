function Device(e) {
    var a_alpha = event.alpha,
        B_beta = event.beta,
        Y_gamma = event.gamma,
        abs = event.absolute;

    var R_Z = -(Y_gamma * Math.cos( this.deg2radian(B_beta) )),
        R_X = (B_beta - 90) * Math.cos( this.deg2radian(Y_gamma) ),
        R_Y = -(a_alpha + Y_gamma);

    return {
        R_Z: R_Z,
        R_X: R_X,
        R_Y: R_Y
    }
}

Device.prototype = {
    deg2radian(deg) {
        const radian = Math.PI / 180;
        return deg * radian;
    }
};

module.exports = Device
