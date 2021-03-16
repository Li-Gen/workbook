//index.js
//获取应用实例
const app = getApp();

Page({
  data:{
    actions: [
      {index:'0',name: "选项一"},
      {index:'1',name: "选项二"},
      {index:'2',name: "选项三"}
    ],
    content:"这是详情，请详细描述自己想要提醒的内容"
  },
  onReady: function () {
    this.actionSheet = this.selectComponent("#actionSheet")
  },
  // 点击点我按钮
  showAction(){
    this.actionSheet.showAction()
  },
  // actionSheet取消按钮
  _cancel(){
    console.log("你点击了取消按钮");
  },
  // 选择actionSheet的每一option
  _option(e){
    console.log(`option下标可以从e中获取`,e);
  }
});