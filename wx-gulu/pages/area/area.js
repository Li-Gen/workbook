// pages/area/area.js
Page({
    data: {
        city: '',//存放地区
        station: '',//存放维修站
        perList: '',// 存放维修人员
        multiArray: [[], [], []],
        multiIndex: [0, 0, 0],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCityStationPer();
    },
    getCityStationPer: function () {
        let that = this;
        that.setData({
            city: ['安徽', '陕西', '福建'],//存放地区
            station: {'安徽': ['合肥', '芜湖'], '陕西': ['西安', '咸阳'], '福建': ['厦门','漳州','泉州']},//存放维修站
            perList: {
                '合肥': ['李工', '王工'],
                '芜湖': ['赵工', '钱工'],
                '西安': ['西安维修人员1', '西安维修人员2'],
                '咸阳': ['咸阳人员1', '咸阳人员2'],
                '厦门': ['厦门1', '厦门2'],
                '漳州': ['漳州1', '漳州2'],
                '泉州': ['泉州1', '泉州2'],
            },// 存放维修人员
        });
        that.data.multiArray[0] = that.data.city;
        that.data.multiArray[1] = this.getArr(that.data.city[0], that.data.station);
        that.data.multiArray[2] = this.getArr(that.data.multiArray[1][0], that.data.perList);
        that.setData({
            multiArray: that.data.multiArray
        })
    },
    /****列发生改变 */
    bindMultiPickerColumnChange: function (e) {
        let that = this;
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        let data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                //第一列改变  设置第二列数据
                let arr = that.getArr(that.data.city[e.detail.value], that.data.station);
                data.multiArray[1] = arr;
                that.setData({
                    multiArray: data.multiArray
                });
                //从第二列中拿出第一项，设置第三组人员
                let arrColumn2 = that.getArr(arr[0], that.data.perList);
                data.multiArray[2] = arrColumn2;
                that.setData({
                    multiArray: data.multiArray
                });
                break;
            case 1:
                //第二列改变 设置第三列数据
                let arr2 = that.getArr(data.multiArray[1][e.detail.value], that.data.perList)
                data.multiArray[2] = arr2;
                that.setData({
                    multiArray: data.multiArray
                });
                break;
        }
    },
    /****值发生改变 */
    bindMultiPickerChange: function (e) {
        this.setData({
            multiIndex: e.detail.value
        })
    },
    getArr: function (value, arr) {
        for (let i in arr) {
            if (value == i) {
                return arr[i]
            }
        }
    }
});