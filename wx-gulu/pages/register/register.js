import validate from '../../utils/verify'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    planId: "",
    array: ['了解自己', '职业规划', '求职创业', '科学研究'],
    eduArray:['博士','硕士','本科','专科','中专及一下'],
    index: 0,
    form:{
      name: "",
      gender:[
        {name: '1',value: '男',checked:'true'},
        {name: '2',value:'女'}
      ],
      age:"",
      married:[
        {name: '3',value: '未婚',checked:'true'},
        {name: '4',value:'已婚'}
      ],
      edu: "",
      job:"",
      company: "",
      phone: "",
      profession: ""
    }
  },
  onLoad: function (options) {
    this.setData({
      planId: options.planId
    })
  },
  bindPickerChange(e){
      this.setData({
        index: e.detail.value
      })
  },
  // 校验手机号
  checkPhone(e){
    console.log(e)
    const phoneNumer = validate.isPhone(e.detail.value)
    if(!phoneNumer){
      wx.showToast({
        title: '手机号格式错误！',
        image: "../../image/warning.png"
      })
    }
  },
  // 校验年龄
  checkAge(e){
    const age =validate.isAge( e.detail.value)
    if(!age){
      wx.showToast({
        title: '年龄错误！',
        image: "../../image/warning.png"
      })
    }
  },
  // 校验姓名
  checkName(e){
    const Name=validate.isName(e.detail.value) 
    if(!Name){
      wx.showToast({
        title: '姓名格式错误！',
        image: "../../image/warning.png"
      })
    }
  },
  // 校验身份证
  checkIdentify(e){
    const identify = validate.IdentityIDCard(e.detail.value)
    if(identify.errorMess){
      wx.showToast({
        title: identify.errorMess,
        image: "../../image/warning.png"
      })
    }else{

    }
  },
  // 学历改变
  eduChange(e){
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  // 提交表单
  formSubmit(e){
    const value = e.detail.value;
    if(!value.age || !value.gender || !value.edu || !value.job || !value.motive) {
      wx.showToast({
        title: "*号为必填项",
        image: "../../image/warning.png"
      });
      return;
    }
    const planId = this.data.planId;
    // 表单提交的数据
    const params = JSON.stringify(e.detail.value) ;
    //校验表单
    console.log(params);
    wx.navigateTo({
      url: '/pages/startTest/startTest?form='+params+'&planId='+planId
  })
  }
});