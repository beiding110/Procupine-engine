const Json2Dom = require('@/lib/Json2Dom.js');
const { VIEW_RANGE, MARK_DISTANCE } = require('./var.js');

function Marks(obj) {
    this.init(obj);
}

Marks.prototype = {
    init(obj) {
        this.$setting = obj;

        this.J2D = new Json2Dom({
            el: 'body',
        });

        this.initCSS3D();

        this.$dom = this.J2D.$dom;

        if (this.$setting && Array.isArray(this.$setting) && this.$setting.length > 0) {
            this.markCSS3D(this.$setting);
        }
    },
    initCSS3D() {
        var tree = {
            tag: 'div',
            attr: {
                style: `
                    position: fixed; 
                    left: 0; 
                    right: 0; 
                    top: 0; 
                    bottom: 0; 
                    overflow: hidden;
                `,
                class: 'css3__marks--con',
            },
            children: [
                {
                    tag: 'div',
                    attr: {
                        style: `
                            transform-style: preserve-3d; 
                            perspective: ${VIEW_RANGE}; 
                            width: 100%; 
                            height: 100%;
                        `,
                        class: 'css3__marks--stage',
                    },
                    children: [
                        {
                            tag: 'div',
                            attr: {
                                style: `
                                    position: relative; 
                                    left: 0;
                                    right: 0;
                                    top: 0;
                                    bottom: 0;
                                    transform-style: preserve-3d;
                                    width: 100%;
                                    height: 100%;
                                    transform: translate3d(50%, 50%, ${VIEW_RANGE});
                                `,
                                class: 'css3__marks--box',
                            },
                            children: [],
                        },
                    ],
                },
            ],
        };

        this.J2D.build(tree);
    },
    markCSS3D(arr) {
        var MARK_SIZE = '60px';

        var box = this.$dom.querySelector('.css3__marks--box');

        arr.forEach((item) => {
            const { x, y } = item;

            let el = document.createElement('div');

            el.className = 'css3__marks--item';

            let dx = -x,
                dy = 360 - (y % 360);

            el.style = `
                width: ${MARK_SIZE}; 
                height: ${MARK_SIZE}; 
                position: absolute;
                background: rgba(255,255,255,.7); 
                border-radius: 50%;
                transform-origin: center center;
                transform: rotateX(${dx}deg) rotateY(${dy}deg) translate3d(0, 0, -${MARK_DISTANCE}px);
            `;

            // 绑定事件
            if (item.click) {
                var eventName = 'click';

                if('ontouchstart' in document) {
                    eventName = 'touchstart';
                }

                el.addEventListener(eventName, event => {
                    event.preventDefault();
                    event.stopPropagation();

                    item.click(event);
                });
            }

            box.appendChild(el);
        });
    },
    driveCSS3D: function (obj) {
        var R_X = obj.x,
            R_Y = obj.y,
            R_Z = obj.z,
            box = document.querySelector('.css3__marks--box');

        box.style.transform = `
            translate3d(0, 0, ${VIEW_RANGE}) 
            rotateZ(${R_Z}deg) 
            rotateX(${R_X}deg) 
            rotateY(${R_Y}deg) 
            translate3d(50%, 50%, 0)
        `;
    },
};

module.exports = Marks;
