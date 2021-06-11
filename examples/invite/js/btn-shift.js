function BtnShift(obj) {
    this.init(obj);
};

BtnShift.prototype = {
    init: function(obj) {
        this.$settings = obj;

        this.$el = null;
        this.$icon = obj.icon;

        this.createDom();
        this.initIcon();
    },
    initIcon: function() {
        if(this.$icon && this.$icon.length) {
            this.$iconIndex = 0;
            this.$iconLength = this.$icon.length;
            this.$el.style.backgroundImage = 'url(' + this.$icon[this.$iconIndex] + ')';
        };
    },
    iconShift: function() {
        if(!this.$iconLength) return;
        if(this.$iconIndex < (this.$iconLength - 1)) {
            this.$iconIndex ++;
        } else {
            this.$iconIndex = 0;
        };

        this.$el.style.backgroundImage = 'url(' + this.$icon[this.$iconIndex] + ')';
    },
    createDom: function() {
        var div = document.createElement('div');
        div.className = 'btn-shift';

        var that = this;
        div.addEventListener('click', function() {
            that.$settings.click();
            that.iconShift();
        });

        this.$el = div;
        document.body.appendChild(div);
    }
}
