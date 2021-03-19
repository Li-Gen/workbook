## 使用方法

1.在需要引入的组件目录下的引入组件的路径,例如：
```
{
  "usingComponents": {
    "popup": "/component/popup/popup"
  }
}
```

2.如果要控制组件的隐藏和显示需要在onReady中获取组件，例如:
```
onReady: function () {
    this.actionSheet = this.selectComponent("#actionSheet")
  },
```
----------------

## 组件

### 上拉

#### 1、属性
 - actions数组为上拉列表的每一项  - Array,例如:
 ```
 actions: [
      {index:'0',name: "选项一"},
      {index:'1',name: "选项二"},
      {index:'2',name: "选项三"}
    ],
```

- btn_cancel: 按钮文本 - String

- id: actionSheet(为了获取组件控制组件的现实和隐藏)

#### 2、事件

- _cancel: 点击取消时触发的事件

- _option: 点击下拉的option触发的事件，option的下标可以在事件信息对象e中获取

- showAction: (组件内部函数可直接调用)作用是切换显示状态

#### 3、demo

```html
// wxml
<action-sheet
          actions="{{actions}}"
          btn_cancel="取消"
          id="actionSheet"
          bind:cancel="_cancel"
          bind:option="_option">
</action-sheet>

// js
actions: [
      {index:'0',name: "选项一"},
      {index:'1',name: "选项二"},
      {index:'2',name: "选项三"}
],
```
---------------

### 弹框（popup）

#### 1、属性

- title: 标题内容 - String
- content: 详情 - String
- id:popup

#### 2、事件

- _success: 点击按钮触发的事件

#### 3、demo

```html
<popup id='popup'
       title='标题'
       content='{{content}}'
       btn_ok='确认'
       bind:success="_success">
 </popup>
```

-------------------

### 栅格布局(layout)

#### 1、使用方法

只需要将wxss中的样式文件复制到app.wxss中全局都可以使用栅格的样式;

#### 2、demo: 

```html
<view class="row">
    <view class="col">
        <view class="col-3"></view>
        <view class="col-9"></view>
    </view>
</view>
```