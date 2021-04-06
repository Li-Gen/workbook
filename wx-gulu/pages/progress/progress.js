// pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    activeProgress: '1',
    len: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onNext(){
    const index2 = this.data.index + 2
    const index = this.data.index 
    const len = this.data.len
    if(index2 === len+1){
      wx.showToast({
        title: '已经到最后一题了'
      })
      return
    }
    console.log("index",index)
    this.setData({
      index: index + 1
    })
    const activeProgress = (index2  / len) * 100
    this.setData({
        activeProgress
    })
  },
  onPre(){
    const index2 = this.data.index 
    const index = this.data.index - 1
    const len = this.data.len
    console.log("index",index)
    if(index2 === 0){
      wx.showToast({
        title: '已经是第一题了'
      })
      return
    }
    this.setData({
      index: this.data.index - 1
    })
    const activeProgress = (index2 / len) * 100
    this.setData({
        activeProgress
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})