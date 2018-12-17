function Delta() {
    this.delta_a_alpha = 0;
    this.delta_B_beta = 0;
    this.delta_Y_gamma = 0;

    this.delta_a_i = -1;

    this.Old_Rotate = [0, 0, 0];
    this.delta_a_ba = [0, 0, 0, 0, 0, 0, 0, 0];
}

Delta.prototype = {
    calc(a_alpha, B_beta, Y_gamma) {
        this.delta_a_alpha = a_alpha - this.Old_Rotate[0];
        this.delta_a_alpha = Math.abs(this.delta_a_alpha) > 340 ? 0 : this.delta_a_alpha;

        this.delta_Y_gamma = Y_gamma - this.Old_Rotate[2];

        if (this.delta_a_i == -1) {
            this.delta_a_i ++;
        } else {
            this.delta_a_ba[this.delta_a_i] = this.delta_a_alpha;
            this.delta_a_alpha = this.delta_a_ba.reduce(function(total, item) {
                return (total + item);
            })
            this.delta_a_alpha = this.delta_a_alpha / this.delta_a_ba.length;

            this.delta_a_i = ++this.delta_a_i === this.delta_a_ba.length ? 0 : this.delta_a_i;
        }

        this.Old_Rotate = [a_alpha, B_beta, Y_gamma];

        return {
            d_a: this.delta_a_alpha,
            d_B: this.delta_B_beta,
            d_Y: this.delta_Y_gamma
        }
    }
};

module.exports = Delta;
