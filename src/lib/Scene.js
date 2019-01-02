const Json2Dom = require('@/lib/Json2Dom.js')

function Scene(obj) {
    this.init(obj)
}

Scene.prototype = {
    init(obj) {
        this.$setting = obj;

        this.J2D = new Json2Dom({
            el: 'body'
        });

        if(obj.type && obj.type==='canvas') {

        } else {
            this.initCSS3D();
        };
        this.$dom = this.J2D.$dom;

        if(this.$setting.chartlet && Array.isArray(this.$setting.chartlet) && this.$setting.chartlet.length>0) {
            if(obj.type && obj.type==='canvas') {

            } else {
                this.chartletCSS3D(this.$setting.chartlet);
            };
        }
    },
    initCSS3D() {
        var FACE_HAFL_WIDTH = 512,
            VIEW_RANGE = '398.135px',
            img_common_style = 'width:' + ((FACE_HAFL_WIDTH+1) * 2) + 'px; height:' + ((FACE_HAFL_WIDTH+1) * 2) + 'px; position:absolute;'

        var tree = {
            tag: 'div',
            attr: {
                style: 'position:fixed; left:0; right:0; top:0; bottom:0; overflow:hidden;',
                class: 'css3__scene--con'
            },
            children: [
                {
                    tag: 'div',
                    attr: {
                        style: 'transform-style:preserve-3d; perspective:' + VIEW_RANGE + '; width:100%; height:100%;',
                        class: 'css3__scene--stage'
                    },
                    children: [
                        {
                            tag: 'div',
                            attr: {
                                style: 'position:relative; left:0; right:0; top:0; bottom:0; transform-style:preserve-3d; width:100%; height:100%; transform:translate3d(50%,50%,' + VIEW_RANGE + ')',
                                class: 'css3__scene--box'
                            },
                            children: [
                                {
                                    tag: 'img',
                                    attr: {
                                        style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(-90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:red;',
                                        class: 'css3__scene--faces'
                                    }
                                },{
                                    tag: 'img',
                                    attr: {
                                        style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:orange;',
                                        class: 'css3__scene--faces'
                                    }
                                },{
                                    tag: 'img',
                                    attr: {
                                        style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateX(-90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:yellow;',
                                        class: 'css3__scene--faces'
                                    }
                                },{
                                    tag: 'img',
                                    attr: {
                                        style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateX(90deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:green;',
                                        class: 'css3__scene--faces'
                                    }
                                },{
                                    tag: 'img',
                                    attr: {
                                        style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(0deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:blue;',
                                        class: 'css3__scene--faces'
                                    }
                                },{
                                    tag: 'img',
                                    attr: {
                                        style: img_common_style + 'transform:translate3d(-50%,-50%,0) rotateY(180deg) translateZ(-' + FACE_HAFL_WIDTH + 'px); background-color:purple;',
                                        class: 'css3__scene--faces'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        this.J2D.build(tree);
    },
    chartletCSS3D(arr) {
        var faces = this.$dom.querySelectorAll('.css3__scene--faces');
        faces.forEach(function(node, index) {
            node.setAttribute('src', arr[index]);
        })
    },
    driveCSS3D: function(obj) {
        if(this.$setting.type !== 'css') {
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
