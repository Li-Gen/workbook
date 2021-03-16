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


## 组件

### 上拉

#### 属性
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

#### 事件

- _cancel: 点击取消时触发的事件

- _option: 点击下拉的option触发的事件

- showAction: (组件内部函数可直接调用)显示组件

### 弹框

#### 属性

- title: 标题内容 - String
- content: 详情 - String
- id:popup

#### 事件

- _success: 点击按钮触发的事件