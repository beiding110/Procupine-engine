(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Pro", [], factory);
	else if(typeof exports === 'object')
		exports["Pro"] = factory();
	else
		root["Pro"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Device = __webpack_require__(/*! @/lib/Device.js */ "./src/lib/Device.js");
var Scene = __webpack_require__(/*! @/lib/Scene.js */ "./src/lib/Scene.js");
var Dragger = __webpack_require__(/*! @/lib/Dragger.js */ "./src/lib/Dragger.js");

function Pro(setting) {
    this.xrot = 0;
    this.yrot = 0;
    this.zrot = 0;

    this.eventer = null;

    this.init(setting);
    console.log('Pro init');
}

Pro.prototype = {
    init: function init(setting) {
        this.$setting = setting;
        var that = this;

        if (setting.scene) {
            this.$scene = new Scene(setting.scene);
        }

        if (this.$setting.mode === 'drag') {
            this.switchModel('drag');
        } else {
            this.switchModel('orientation');
        };
    },
    update: function update(obj) {
        this.xrot = obj.x;
        this.yrot = obj.y;
        this.zrot = obj.z;

        if (this.$setting.scene) {
            if (this.$setting.scene.type == 'css') {
                this.$scene.driveCSS3D({
                    x: obj.x,
                    y: obj.y,
                    z: obj.z
                });
            }
        };

        this.$setting.handler && this.$setting.handler({
            x: this.xrot,
            y: this.yrot,
            z: this.zrot
        });
    },
    switchModel: function switchModel(type, success, failed) {
        var that = this;

        try {
            that.eventer.destroy();
        } catch (e) {};

        var switchObj = {
            drag: function drag() {
                that.eventer = new Dragger({
                    handler: function handler() {
                        that.update({
                            x: +this.xr_sum,
                            y: -this.yr_sum,
                            z: 0
                        });
                    }
                });
                success && success();
            },
            orientation: function orientation() {
                if (!window.DeviceOrientationEvent) {
                    console.error('您的浏览器不支持相关传感器的调用，已为您打开拖拽模式');
                    that.switchModel('drag');
                    failed && failed();
                    return;
                };

                function deviceorientationHandler(event) {
                    var revent = new Device(event);

                    var a_alpha = revent.R_X,
                        B_beta = revent.R_Y,
                        Y_gamma = revent.R_z;

                    that.update({
                        x: revent.R_X,
                        y: revent.R_Y,
                        z: revent.R_Z
                    });

                    revent = null;
                };

                window.ondeviceorientation = function () {
                    var revent = new Device(event);

                    var a_alpha = revent.R_X,
                        B_beta = revent.R_Y,
                        Y_gamma = revent.R_z;

                    that.update({
                        x: revent.R_X,
                        y: revent.R_Y,
                        z: revent.R_Z
                    });

                    revent = null;
                };

                that.eventer = {
                    destroy: function destroy() {
                        window.ondeviceorientation = null;
                    }
                };

                success && success();
            }
        };

        switchObj[type]();
    }
};

module.exports = Pro;

/***/ }),

/***/ "./src/lib/Device.js":
/*!***************************!*\
  !*** ./src/lib/Device.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Device(e) {
    var a_alpha = event.alpha,
        B_beta = event.beta,
        Y_gamma = event.gamma,
        abs = event.absolute;

    var R_Z = -(Y_gamma * Math.cos(this.deg2radian(B_beta))),
        R_X = (B_beta - 90) * Math.cos(this.deg2radian(Y_gamma)),
        R_Y = -(a_alpha + Y_gamma);

    return {
        R_Z: R_Z,
        R_X: R_X,
        R_Y: R_Y
    };
}

Device.prototype = {
    deg2radian: function deg2radian(deg) {
        var radian = Math.PI / 180;
        return deg * radian;
    }
};

module.exports = Device;

/***/ }),

/***/ "./src/lib/Dragger.js":
/*!****************************!*\
  !*** ./src/lib/Dragger.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Dragger(obj) {
    this.init(obj);
}

Dragger.prototype = {
    init: function init(obj) {
        this.xr = 0;
        this.yr = 0;
        this.xr_sum = 0;
        this.yr_sum = 0;
        this.$setting = obj;

        this.last_x = 0;
        this.last_y = 0;

        this.eventType = '';

        var that = this;

        if ('ontouchstart' in document) {
            this.initListener('touch');
        } else {
            this.initListener('mouse');
        }
    },
    initListener: function initListener(eventType) {
        this.eventType = eventType;

        var eventArr = ['ontouchstart', 'ontouchmove', 'ontouchend'],
            that = this;
        if (eventType === 'mouse') {
            eventArr = ['onmousedown', 'onmousemove', 'onmouseup'];
        };

        document[eventArr[0]] = function (event) {
            event.preventDefault();
            var ev = eventType === 'touch' ? event.touches[0] : event;

            var disX = ev.clientX;
            var disY = ev.clientY;

            document[eventArr[1]] = function (event) {
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
            document[eventArr[2]] = function () {
                document[eventArr[1]] = null;
                document[eventArr[2]] = null;

                that.last_x = that.xr_sum;
                that.last_y = that.yr_sum;

                console.log(that.last_x, that.last_y);
            };
            return false;
        };
    },
    destroy: function destroy() {
        var switchObj = {
            touch: ['ontouchstart', 'ontouchmove', 'ontouchend'],
            mouse: ['onmousedown', 'onmousemove', 'onmouseup']
        };

        switchObj[this.eventType].forEach(function (item) {
            document[item] = null;
        });
    }
};

module.exports = Dragger;

/***/ }),

/***/ "./src/lib/Json2Dom.js":
/*!*****************************!*\
  !*** ./src/lib/Json2Dom.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Json2Dom(obj) {
    this.init(obj);
}

Json2Dom.prototype = {
    init: function init(obj) {
        this.$el = document.querySelector(obj.el);
    },
    build: function build(json) {
        // json = Array.isArray(json) ? json : [json];

        var vdom = this.deepTree(json);

        this.$dom = vdom;
        this.$el.appendChild(vdom);
    },
    clear: function clear() {
        this.$el.innerHtml = '';
    },
    deepTree: function deepTree(node) {
        var that = this;
        // var vc = document.createDocumentFragment();
        //
        // node.forEach(function(leaf) {
        //     var tag = document.createElement(leaf.tag);
        //     if(leaf.attr) {
        //         Object.keys(leaf.attr).forEach(function(key) {
        //             tag.setAttribute(key, leaf.attr[key]);
        //         });
        //     };
        //     vc.appendChild(tag);
        //
        //     if(leaf.children && leaf.children.length > 0) {
        //         tag.appendChild(that.deepTree(leaf.children));
        //     }
        // });

        // return vc;


        var tag = document.createElement(node.tag);
        if (node.attr) {
            Object.keys(node.attr).forEach(function (key) {
                tag.setAttribute(key, node.attr[key]);
            });
        };

        if (node.children && node.children.length > 0) {
            node.children.forEach(function (leaf) {
                tag.appendChild(that.deepTree(leaf));
            });
        }

        return tag;
    }
};

module.exports = Json2Dom;

/***/ }),

/***/ "./src/lib/Scene.js":
/*!**************************!*\
  !*** ./src/lib/Scene.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Json2Dom = __webpack_require__(/*! @/lib/Json2Dom.js */ "./src/lib/Json2Dom.js");

function Scene(obj) {
    this.init(obj);
}

Scene.prototype = {
    init: function init(obj) {
        this.$setting = obj;

        this.J2D = new Json2Dom({
            el: 'body'
        });

        if (obj.type && obj.type === 'canvas') {} else {
            this.initCSS3D();
        };
        this.$dom = this.J2D.$dom;

        if (this.$setting.chartlet && Array.isArray(this.$setting.chartlet) && this.$setting.chartlet.length > 0) {
            if (obj.type && obj.type === 'canvas') {} else {
                this.chartletCSS3D(this.$setting.chartlet);
            };
        }
    },
    initCSS3D: function initCSS3D() {
        var FACE_HAFL_WIDTH = 512,
            VIEW_RANGE = '398.135px',
            img_common_style = 'width:' + (FACE_HAFL_WIDTH + 1) * 2 + 'px; height:' + (FACE_HAFL_WIDTH + 1) * 2 + 'px; position:absolute;';

        var tree = {
            tag: 'div',
            attr: {
                style: 'position:fixed; left:0; right:0; top:0; bottom:0; overflow:hidden;',
                class: 'css3__scene--con'
            },
            children: [{
                tag: 'div',
                attr: {
                    style: 'transform-style:preserve-3d; perspective:' + VIEW_RANGE + '; width:100%; height:100%;',
                    class: 'css3__scene--stage'
                },
                children: [{
                    tag: 'div',
                    attr: {
                        style: 'position:relative; left:0; right:0; top:0; bottom:0; transform-style:preserve-3d; width:100%; height:100%; transform:translate3d(50%,50%,' + VIEW_RANGE + ')',
                        class: 'css3__scene--box'
                    },
                    children: [{
                        tag: 'img',
                        attr: {
                            style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(-90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:red;',
                            class: 'css3__scene--faces'
                        }
                    }, {
                        tag: 'img',
                        attr: {
                            style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:orange;',
                            class: 'css3__scene--faces'
                        }
                    }, {
                        tag: 'img',
                        attr: {
                            style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateX(-90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:yellow;',
                            class: 'css3__scene--faces'
                        }
                    }, {
                        tag: 'img',
                        attr: {
                            style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateX(90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:green;',
                            class: 'css3__scene--faces'
                        }
                    }, {
                        tag: 'img',
                        attr: {
                            style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(0deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:blue;',
                            class: 'css3__scene--faces'
                        }
                    }, {
                        tag: 'img',
                        attr: {
                            style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(180deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:purple;',
                            class: 'css3__scene--faces'
                        }
                    }]
                }]
            }]
        };

        this.J2D.build(tree);
    },
    chartletCSS3D: function chartletCSS3D(arr) {
        var faces = this.$dom.querySelectorAll('.css3__scene--faces');
        faces.forEach(function (node, index) {
            node.setAttribute('src', arr[index]);
        });
    },

    driveCSS3D: function driveCSS3D(obj) {
        if (this.$setting.type !== 'css') {
            console.error('Your Scene is not css3d model');
            return;
        };

        var R_X = obj.x,
            R_Y = obj.y,
            R_Z = obj.z;

        document.querySelector('.css3__scene--box').style.transform = 'translate3d(0,0,398.135px) rotateZ(' + R_Z + 'deg) rotateX(' + R_X + 'deg) rotateY(' + R_Y + 'deg) translate3d(50%,50%,0)';
    }
};

module.exports = Scene;

/***/ })

/******/ });
});
//# sourceMappingURL=procupine.js.map