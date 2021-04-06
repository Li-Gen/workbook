Page({
  data: {
    date: '',
    showCalendar: false
  },
  showCalendar: function () {
    this.setData({
      showCalendar: true
    })
  },
  //选择日期
  _doChange: function (e) {
    console.log(e.detail)
    this.setData({
      date: e.detail.date
    })
  },
  //关闭选择器
  _doClose: function () {
    this.setData({
      showCalendar: false
    })
  }
})