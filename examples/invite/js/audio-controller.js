function AudioController(obj) {
  this.init(obj);
};

AudioController.prototype = {
  init: function(obj) {
    this.$settings = obj;
    this.$playState = false;
    this.$el = null;
    this.$btn = null;

    this.createDom();
    this.loadSrc(obj.src);

    this.initControllerDom();
  },
  createDom: function() {
    var audio = document.createElement('audio');
    if(this.$settings.auto) {
      audio.setAttribute('autoplay', true);
      document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
      }, false);
    };

    var that = this;
    audio.addEventListener('play', function() {
      that.playHandler();
    });
    audio.addEventListener('pause', function() {
      that.notPlayHandler();
    });
    audio.addEventListener('stop', function() {
      that.notPlayHandler();
    });

    this.$el = audio;
    document.body.appendChild(audio);
  },
  loadSrc: function(src) {
    this.$el.src = src;
  },
  play: function() {
    this.$el.play();
  },
  pause: function() {
    this.$el.pause();
  },
  toggle: function() {
    if(this.$playState) {
      this.pause();
    } else {
      this.play();
    };
  },
  initControllerDom: function() {
    var div = document.createElement('div');
    div.className = 'audio-controller-btn stop';

    var that = this;
    div.addEventListener('click', function() {
      that.toggle();
    });

    this.$btn = div;
    document.body.appendChild(div);
  },
  playHandler: function() {
    this.$btn.classList.add('play');
    this.$btn.classList.remove('stop');

    this.$playState = true;
  },
  notPlayHandler: function() {
    this.$btn.classList.add('stop');
    this.$btn.classList.remove('play');

    this.$playState = false;
  }
}
