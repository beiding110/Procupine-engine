function BtnView(obj) {
    this.init(obj);
};

BtnView.prototype = {
    init: function(obj) {
        this.$settings = obj;

        this.$active = true;
        this.$el = null;

        this.createElement(obj.click);
    },
    createElement: function(click) {
        var div = document.createElement('div');
        div.className = 'btn-view';

        var that = this;
        div.addEventListener('click', function() {
            click && click(!that.$active);

            that.toggleClass();
        });

        this.$el = div;
        document.body.appendChild(div);
    },
    toggleClass: function() {
        if(this.$active) {
            this.$el.classList.add('hide');
        } else {
            this.$el.classList.remove('hide');
        };
        this.$active = !this.$active;
    }
};
