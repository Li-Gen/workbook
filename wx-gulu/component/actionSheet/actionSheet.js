// component/actionSheet/actionSheet.js
Component({
  properties:{
    actions:{
      type: Array,
      value: []
    },
    btn_cancel:{
      type: String,
      value: '取消'
    }
  },
  data:{
    action: true
  },
  methods:{
    // 展示上拉菜单
    showAction(){
      this.setData({
        action: !this.data.action
      })
    },
    // 隐藏上拉菜单
    hideAction(){
      this.setData({
        action: !this.data.action
      })
    },
    // 点击取消按钮
    _cancel(){
      // 触发取消回调
      this.triggerEvent("cancel");
      this.hideAction()
    },
    // 点击option中的任一选项
    _option(e){
      // 触发option列表回调
      this.triggerEvent("option",e);
      this.hideAction()
    }
  }
});
