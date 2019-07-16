# Procupine-engine

## 一个纯js移动端vr浏览解决方案

### 说明

procupine-engine是一个由纯js编写的，基于移动端 `角度传感器（或鼠标、触屏拖动）` 编写的类库，使用该类库，你可以轻松创建一个web端的模拟vr场景，并用 `移动硬件设备` 的方式进行浏览，并且该类提供了外用接口，可以为其他类提供设备角度接口，进行使用。

该项目的最初想法及版本开发于2017年，为本人在西安理工大学就读时的毕设。

相比于毕设作品，本次使用webpack工具重构的procupine-engine虽然在体积上有所增加，但是，由于计算出了通用算法相比于前者在兼容性上有质的飞跃。

### 使用说明

页面中需要实例化Pro类：

```js

new Pro({
    scene: {
        type: 'css',
        chartlet: chartletArr
    },
    mode: 'drag',
    handler: function(obj) {
        console.log(obj)
    }
})

```

实例化需要参数，其中包含：

`scene：` 用于生成场景，如果不设置该属性，则不会生成场景。

参数 | 类型 | 说明 | 默认值 | 必填
:-: | :-: | :-: | :-: | :-:
type | String | 生成场景的类型，目前只支持'css'(使用css3d构建场景) | - | *
chartlset | Array | 场景的贴图，如果type为css，则需引入6个立方体面贴图，分别对应[右,左,上,下,前,后] | - | *

`mode：` 用于选择控制的类型，如果设置为drag，则会激活（鼠标或触屏）拖动操作，如果不设置该属性，则为仅用传感器控制；

`handler：` scene创建的场景可被该类自动控制，如果你想使用外部的场景，并使用该类库中的场景进行控制，则可以设置该属性，当控制场景的变量发生变化时，会触发该函数，该函数有一个参数，类型为 `对象` ，对象中包含三个属性x、y、z分别对应三个坐标轴的转角。

### 作为接口使用

```js

var pro = new Pro({
    handler: function(obj) {
        console.log(obj)
    }
});

console.log(pro.xrot, pro.yrot, pro.zrot);

```

handler函数可用来作为触发其他实例变化的接口，如果要取到pro实例中的角度值，也可直接使用 `pro.xrot` 的方法。当然这个值只是一个瞬时值。
