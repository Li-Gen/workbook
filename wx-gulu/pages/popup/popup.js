//index.js
//获取应用实例
const app = getApp();

Page({
  data:{
    content:"这是详情，请详细描述自己想要提醒的内容"
  },
  onReady: function () {
    //获得组件
    this.popup = this.selectComponent("#popup");
  },
  // 点击上拉菜单按钮
  showPopup() {
    this.popup.showPopup();
  },
  //popup确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
  }
});