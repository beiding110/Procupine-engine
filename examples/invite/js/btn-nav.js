function BtnNav(obj) {
  this.init(obj);
};

BtnNav.prototype = {
  init: function(obj) {
    this.$settings = obj;

    this.$actionList = obj.actionList || [];
    this.$current = 0;
    this.$itemList = [];

    this.createElement();
    this.setActiveItem();
  },
  createElement: function() {
    var that = this;

    var div_container = document.createElement('div');
    div_container.className = 'btn-nav_container';

    var btn_prev = document.createElement('div');
    btn_prev.className = 'btn-nav_btns btn-prev';

    var btn_next = document.createElement('div');
    btn_next.className = 'btn-nav_btns btn-next';

    var item_list = document.createElement('div');
    item_list.className = 'btn-nav_item-list';

    this.$actionList.forEach(function(item, index) {
      var btn_item = document.createElement('div');

      btn_item.className = 'btn-nav_items';
      btn_item.dataset.index = index;

      btn_item.addEventListener('click', function(event) {
        event.preventDefault();
        if(typeof item === 'function') {
          that.$current = index;
          item();
          that.setActiveItem();
        };
      });

      item_list.appendChild(btn_item);
      that.$itemList.push(btn_item);
    });

    btn_prev.addEventListener('click', function(event) {
      event.preventDefault();
      if(that.$current === 0) return;
      that.$current --;
      that.$actionList[that.$current]();
      that.setActiveItem();
    });
    btn_next.addEventListener('click', function(event) {
      event.preventDefault();
      if(that.$current === that.$actionList.length) return;
      that.$current ++;
      that.$actionList[that.$current]();
      that.setActiveItem();
    });

    div_container.appendChild(btn_prev);
    div_container.appendChild(item_list);
    div_container.appendChild(btn_next);
    document.body.appendChild(div_container);
  },
  setActiveItem: function() {
    this.$itemList.forEach(function(item) {
      item.classList.remove('active');
    });

    this.$itemList[this.$current].classList.add('active');
  }
}
