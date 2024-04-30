!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Pro",[],e):"object"==typeof exports?exports.Pro=e():t.Pro=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){function n(t){this.init(t)}n.prototype={init:function(t){this.$el=document.querySelector(t.el)},build:function(t){var e=this.deepTree(t);this.$dom=e,this.$el.appendChild(e)},clear:function(){this.$el.innerHtml=""},deepTree:function(t){var e=this,n=document.createElement(t.tag);return t.attr&&Object.keys(t.attr).forEach(function(e){n.setAttribute(e,t.attr[e])}),t.children&&t.children.length>0&&t.children.forEach(function(t){n.appendChild(e.deepTree(t))}),n}},t.exports=n},function(t,e){t.exports={VIEW_RANGE:"398.135px",FACE_HAFL_WIDTH:512,MARK_DISTANCE:512}},function(t,e,n){var r=n(3),s=n(4),i=n(5),o=n(6);function a(t){this.xrot=0,this.yrot=0,this.zrot=0,this.eventer=null,this.init(t),console.log("Pro init")}a.prototype={init:function(t){this.$setting=t;t.scene&&(this.$scene=new s(t.scene)),t.marks&&(this.$marks=new i(t.marks)),"drag"===this.$setting.mode?this.switchModel("drag"):this.switchModel("orientation")},update:function(t){this.xrot=t.x,this.yrot=t.y,this.zrot=t.z,this.$setting.scene&&"css"==this.$setting.scene.type&&this.$scene.driveCSS3D({x:t.x,y:t.y,z:t.z}),this.$setting.marks&&this.$marks.driveCSS3D({x:t.x,y:t.y,z:t.z}),this.$setting.handler&&this.$setting.handler({x:this.xrot,y:this.yrot,z:this.zrot})},switchModel:function(t,e,n){var s=this;try{s.eventer.destroy()}catch(t){}({drag:function(){s.eventer=new o({handler:function(){s.update({x:+this.xr,y:-this.yr,z:0})}}),s.$setting.mode="drag",e&&e()},orientation:function(){function t(t){var e=new r(t);s.update({x:e.R_X,y:e.R_Y,z:e.R_Z}),e=null}function i(){window.addEventListener("deviceorientation",t),s.eventer={destroy:function(){window.ondeviceorientation=null,window.removeEventListener("deviceorientation",t)}},s.$setting.mode="orientation",e&&e()}function o(){console.error("您的浏览器不支持相关传感器的调用，已为您打开拖拽模式"),s.switchModel("drag"),n&&n()}window.DeviceOrientationEvent?"function"==typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then(function(t){"granted"===t?i():o()}).catch(function(t){alert("error: "+t),o()}):i():o()}})[t]()}},t.exports=a},function(t,e){function n(t){var e=t.alpha,n=t.beta,r=t.gamma;t.absolute;return{R_Z:-r*Math.cos(this.deg2radian(n)),R_X:(n-90)*Math.cos(this.deg2radian(r)),R_Y:-(e+r)}}n.prototype={deg2radian:function(t){return t*(Math.PI/180)}},t.exports=n},function(t,e,n){var r=n(0),s=n(1),i=s.VIEW_RANGE,o=s.FACE_HAFL_WIDTH;function a(t){this.init(t)}a.prototype={init:function(t){this.$setting=t,this.J2D=new r({el:"body"}),t.type&&"canvas"===t.type||this.initCSS3D(),this.$dom=this.J2D.$dom,this.$setting.chartlet&&Array.isArray(this.$setting.chartlet)&&this.$setting.chartlet.length>0&&(t.type&&"canvas"===t.type||this.chartletCSS3D(this.$setting.chartlet))},initCSS3D:function(){var t="\n                width: "+2*(o+1)+"px; \n                height: "+2*(o+1)+"px; \n                position: absolute;\n            ",e={tag:"div",attr:{style:"\n                    position:fixed; \n                    left:0; \n                    right:0; \n                    top:0; \n                    bottom:0; \n                    overflow:hidden;\n                ",class:"css3__scene--con"},children:[{tag:"div",attr:{style:"\n                            transform-style: preserve-3d; \n                            perspective: "+i+"; \n                            width: 100%; \n                            height: 100%;\n                        ",class:"css3__scene--stage"},children:[{tag:"div",attr:{style:"\n                                    position: relative;\n                                    left: 0;\n                                    right: 0;\n                                    top: 0;\n                                    bottom: 0;\n                                    transform-style: preserve-3d;\n                                    width: 100%;\n                                    height: 100%;\n                                    transform: translate3d(50%, 50%, "+i+");\n                                ",class:"css3__scene--box"},children:[{tag:"img",attr:{style:"\n                                            "+t+"\n                                            transform: translate3d(-50%, -50%, 0)\n                                                rotateY(-90deg)\n                                                translateZ(-"+o+"px);\n                                            background-color: red;\n                                        ",class:"css3__scene--faces"}},{tag:"img",attr:{style:"\n                                            "+t+"\n                                            transform: translate3d(-50%, -50%, 0)\n                                                rotateY(90deg)\n                                                translateZ(-"+o+"px);\n                                            background-color: orange;\n                                        ",class:"css3__scene--faces"}},{tag:"img",attr:{style:"\n                                            "+t+"\n                                            transform: translate3d(-50%, -50%, 0)\n                                                rotateX(-90deg)\n                                                translateZ(-"+o+"px);\n                                            background-color: yellow;\n                                        ",class:"css3__scene--faces"}},{tag:"img",attr:{style:"\n                                            "+t+"\n                                            transform: translate3d(-50%, -50%, 0)\n                                                rotateX(90deg)\n                                                translateZ(-"+o+"px);\n                                            background-color: green;\n                                        ",class:"css3__scene--faces"}},{tag:"img",attr:{style:"\n                                            "+t+"\n                                            transform: translate3d(-50%, -50%, 0)\n                                                rotateY(0deg)\n                                                translateZ(-"+o+"px);\n                                            background-color: blue;\n                                        ",class:"css3__scene--faces"}},{tag:"img",attr:{style:"\n                                            "+t+"\n                                            transform: translate3d(-50%, -50%, 0)\n                                                rotateY(180deg)\n                                                translateZ(-"+o+"px);\n                                            background-color: purple;\n                                        ",class:"css3__scene--faces"}}]}]}]};this.J2D.build(e)},chartletCSS3D:function(t){this.$dom.querySelectorAll(".css3__scene--faces").forEach(function(e,n){e.setAttribute("src",t[n])})},driveCSS3D:function(t){if("css"===this.$setting.type){var e=t.x,n=t.y,r=t.z;document.querySelector(".css3__scene--box").style.transform="\n            translate3d(0, 0, "+i+") \n            rotateZ("+r+"deg) \n            rotateX("+e+"deg) \n            rotateY("+n+"deg) \n            translate3d(50%, 50%, 0)\n        "}else console.error("Your Scene is not css3d model")}},t.exports=a},function(t,e,n){var r=n(0),s=n(1),i=s.VIEW_RANGE,o=s.MARK_DISTANCE;function a(t){this.init(t)}a.prototype={init:function(t){this.$setting=t,this.J2D=new r({el:"body"}),this.initCSS3D(),this.$dom=this.J2D.$dom,this.$setting&&Array.isArray(this.$setting)&&this.$setting.length>0&&this.markCSS3D(this.$setting)},initCSS3D:function(){var t={tag:"div",attr:{style:"\n                    position: fixed; \n                    left: 0; \n                    right: 0; \n                    top: 0; \n                    bottom: 0; \n                    overflow: hidden;\n                ",class:"css3__marks--con"},children:[{tag:"div",attr:{style:"\n                            transform-style: preserve-3d; \n                            perspective: "+i+"; \n                            width: 100%; \n                            height: 100%;\n                        ",class:"css3__marks--stage"},children:[{tag:"div",attr:{style:"\n                                    position: relative; \n                                    left: 0;\n                                    right: 0;\n                                    top: 0;\n                                    bottom: 0;\n                                    transform-style: preserve-3d;\n                                    width: 100%;\n                                    height: 100%;\n                                    transform: translate3d(50%, 50%, "+i+");\n                                ",class:"css3__marks--box"},children:[]}]}]};this.J2D.build(t)},markCSS3D:function(t){var e=this.$dom.querySelector(".css3__marks--box");t.forEach(function(t){var n=t.x,r=t.y,s=document.createElement("div");s.className="css3__marks--item";var i=-n,a=360-r%360;if(s.style="\n                width: 60px; \n                height: 60px; \n                position: absolute;\n                background: rgba(255,255,255,.7); \n                border-radius: 50%;\n                transform-origin: center center;\n                transform: rotateX("+i+"deg) rotateY("+a+"deg) translate3d(0, 0, -"+o+"px);\n            ",t.click){var c="click";"ontouchstart"in document&&(c="touchstart"),s.addEventListener(c,function(e){e.preventDefault(),e.stopPropagation(),t.click(e)})}e.appendChild(s)})},driveCSS3D:function(t){var e=t.x,n=t.y,r=t.z;document.querySelector(".css3__marks--box").style.transform="\n            translate3d(0, 0, "+i+") \n            rotateZ("+r+"deg) \n            rotateX("+e+"deg) \n            rotateY("+n+"deg) \n            translate3d(50%, 50%, 0)\n        "}},t.exports=a},function(t,e){function n(t){this.init(t)}n.prototype={init:function(t){this.xr=0,this.yr=0,this.$setting=t,this.eventType="",this._state=0,this._handlers={},this._eventsMap={touch:["touchstart","touchmove","touchend"],mouse:["mousedown","mousemove","mouseup"]},"ontouchstart"in document?this.initListener("touch"):this.initListener("mouse")},_handlerBuilder:function(){var t=this,e=0,n=0,r=0,s=0;return{startHandler:function(r){r.preventDefault(),r.stopPropagation();var s="touch"===t.eventType?r.touches[0]:r;e=s.clientX,n=s.clientY,t._state=1},moveHandler:function(i){if(i.preventDefault(),i.stopPropagation(),[1,2].includes(t._state)){var o="touch"===t.eventType?i.touches[0]:i,a=(o.clientY-n)/2,c=(o.clientX-e)/2;t.xr=r+a,t.yr=s+c,t.$setting.handler&&t.$setting.handler.call(t),t._state=2}},endHandler:function(e){e.preventDefault(),e.stopPropagation(),2===t._state&&(r=t.xr,s=t.yr,t._state=0)}}},initListener:function(t){this.eventType=t;var e=this._eventsMap[this.eventType];this._handlers=this._handlerBuilder(),document.addEventListener(e[0],this._handlers.startHandler,{passive:!1}),document.addEventListener(e[1],this._handlers.moveHandler,{passive:!1}),document.addEventListener(e[2],this._handlers.endHandler,{passive:!1})},destroy:function(){var t=this._eventsMap[this.eventType];document.removeEventListener(t[0],this._handlers.startHandler),document.removeEventListener(t[1],this._handlers.moveHandler),document.removeEventListener(t[2],this._handlers.endHandler),this._handlers={}}},t.exports=n}])});