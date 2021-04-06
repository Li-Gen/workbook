Page({
  data: {
    fileList: [],
    photo: 0,
    count: 0,
    upload: true
  },
  // 上传图片
    uploadFile() {
      wx.chooseImage({
        count: 5 - this.data.fileList.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.getpublish(res.tempFilePaths, 0)
        }
      })
    },
    // 递归上传
    getpublish(list, i) {
      wx.showLoading({
        title: '正在上传第' + (i + 1) + '张',
      })
      // 配置上传服务器地址
      wx.uploadFile({
        url: "http://uploadFile",
        filePath: list[i],
        name: 'file',
        formData: {
          key: 'key'
        },
        success: (res) => {
          var info = JSON.parse(res.data)
          var array = this.data.fileList
          array.push(info.info.url)
          this.setData({
            fileList: array
          })
          if (i + 1 == list.length) {
            wx.showToast({
              title: '上传成功',
            });
          }
          wx.hideLoading()
          if (++i < list.length) {
            this.getpublish(list, i);
          }
          this.hideUpload()
        },
      })
    },
    // 删除图片
    delFile(e) {
      var index = e.currentTarget.dataset.index
      var list = this.data.fileList
      list.splice(index, 1)
      this.setData({
        fileList: list
      })
      this.hideUpload()
    },
  
    // 隐藏上传控件
    hideUpload() {
      var length = this.data.fileList.length
      if (length == 0) {
        this.setData({
          photo: 0,
          count: 0
        })
      } else {
        this.setData({
          photo: 1,
          count: length
        })
      }
      // 隐藏上传图片
      if (length >= 5) {
        this.setData({
          upload: false
        })
      } else {
        this.setData({
          upload: true
        })
      }
    }
})