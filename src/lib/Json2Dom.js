function Json2Dom(obj) {
    this.init(obj)
}

Json2Dom.prototype = {
    init(obj) {
        this.$el = document.querySelector(obj.el)
    },
    build(json) {
        // json = Array.isArray(json) ? json : [json];

        var vdom = this.deepTree(json);

        this.$dom = vdom;
        this.$el.appendChild(vdom);
    },
    clear() {
        this.$el.innerHtml = '';
    },
    deepTree(node) {
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
        if(node.attr) {
            Object.keys(node.attr).forEach(function(key) {
                tag.setAttribute(key, node.attr[key]);
            });
        };

        if(node.children && node.children.length > 0) {
            node.children.forEach(function(leaf) {
                tag.appendChild(that.deepTree(leaf))
            })
        }

        return tag;
    }
};

module.exports = Json2Dom
