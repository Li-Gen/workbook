Page({

    /**
     * 页面的初始数据
     */
    data: {
        collapseStatus: false,
        // 普通用法
        oneActionIndex: -1,
        // 自定义内容样式
        twoActionIndex: -1,
        // 自定义内容样式 and 自定义右侧icon
        threeActionIndex: -1,
        collapseList: [{
            title: '标题一',
            content: '最灵繁的人也看不见自己的背脊。'
        }, {
            title: '标题二',
            content: '业余生活要有意义，不要越轨。'
        }, {
            title: '标题三',
            content: '希望的灯一旦熄灭，生活刹那间变成了一片黑暗。'
        }],
    },

    oneSwiteFun(e) {
        console.log(e, '--e')
        let {
            index
        } = e.detail
        this.setData({
            oneActionIndex: index
        })
    },

    twoSwiteFun(e) {
        console.log(e, '--e')
        let {
            index
        } = e.detail
        this.setData({
            twoActionIndex: index
        })
    },

    threeSwiteFun(e) {
        console.log(e, '--e')
        let {
            index
        } = e.detail
        this.setData({
            threeActionIndex: index
        })
    }
})