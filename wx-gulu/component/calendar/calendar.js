Component({
  properties: {
    start: {
      type: String,
      value: '',
      observer: function (newVal) {
        if (typeof (newVal) == 'string' && newVal.length > 0) {
          var t = new Date(newVal)
          if (!isNaN(t.getTime())) {
            var y = t.getFullYear(),
              m = t.getMonth(),
              d = t.getDate()
            this.setData({
              startDate: [y, m, d]
            })
          }
        }
      }
    },
    end: {
      type: String,
      value: '',
      observer: function (newVal) {
        if (typeof (newVal) == 'string' && newVal.length > 0) {
          var t = new Date(newVal)
          if (!isNaN(t.getTime())) {
            var y = t.getFullYear(),
              m = t.getMonth(),
              d = t.getDate()
            this.setData({
              endDate: [y, m, d]
            })
          }
        }
      }
    },
    value: {
      type: String,
      value: '',
      observer: function (newVal) {
        if (typeof (newVal) == 'string' && newVal.length > 0) {
          var t = new Date(newVal)
          if (!isNaN(t.getTime())) {
            var y = t.getFullYear(),
              m = t.getMonth(),
              d = t.getDate()
            this.setData({
              valueDate: [y, m, d],
              year: y,
              month: m
            })
          }
        }
      }
    },
  },
  data: {
    show: true,
    startDate: [],
    endDate: [],
    valueDate: [],
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    days: []
  },
  methods: {
    loadData: function () {
      var that = this,
        data = that.data,
        year = data.year,
        month = data.month,
        valueDate = data.valueDate,
        startDate = data.startDate,
        endDate = data.endDate,
        date = new Date(year, month, 1),
        week = date.getDay(),
        days = [],
        last = new Date(year, (month + 1), 0),
        max = last.getDate(),
        lastWeek = last.getDay()
      if (week > 0) {
        for (var i = 0; i < week; i++) {
          days.push({
            day: 0
          })
        }
      }
      if (valueDate[0]) var currentTime = new Date(valueDate[0], valueDate[1], valueDate[2]).getTime()
      if (startDate[0]) var startTime = new Date(startDate[0], startDate[1], startDate[2]).getTime()
      if (endDate[0]) var endTime = new Date(endDate[0], endDate[1], endDate[2]).getTime()
      for (var i = 1; i <= max; i++) {
        var current = false,
          disabled = false,
          d = new Date(year, month, i),
          t = d.getTime()
        if (currentTime && currentTime == t) current = true
        if (startTime && startTime > t) disabled = true
        if (endTime && endTime < t) disabled = true
        days.push({
          day: i,
          current: current,
          disabled: disabled
        })
      }
      if (lastWeek != 6) {
        for (var i = 0, l = (6 - lastWeek); i < l; i++) {
          days.push({
            day: 0
          })
        }
      }
      that.setData({
        days: days
      })
    },
    prevMonth: function () {
      var that = this,
        data = that.data,
        year = data.year,
        month = data.month,
        date = new Date(year, (month - 1), 1)
      that.setData({
        year: date.getFullYear(),
        month: date.getMonth()
      }, () => {
        that.loadData()
      })
    },
    nextMonth: function () {
      var that = this,
        data = that.data,
        year = data.year,
        month = data.month,
        date = new Date(year, (month + 1), 1)
      that.setData({
        year: date.getFullYear(),
        month: date.getMonth()
      }, () => {
        that.loadData()
      })
    },
    changeMonth: function (e) {
      var that = this,
        value = e.detail.value,
        date = new Date(value + '-01')
      that.setData({
        year: date.getFullYear(),
        month: date.getMonth()
      }, () => {
        that.loadData()
      })
    },
    changeDate: function (e) {
      var that = this,
        data = that.data,
        year = data.year,
        month = data.month,
        days = data.days,
        index = e.currentTarget.dataset.i,
        value = {}
      if (days[index] && days[index].day > 0 && !days[index].disabled) {
        if (!days[index].current) {
          for (var i = 0, l = days.length; i < l; i++) {
            if (days[i].current) {
              days[i].current = false
              break
            }
          }
        }
        days[index].current = true
        that.setData({
          days: days
        })
        that.closeCalendar()
        value.year = year
        month += 1
        value.month = month
        value.day = days[index].day
        value.date = year + '-' + (month < 10 ? '0' + month : month) + '-' + (days[index].day < 10 ? '0' + days[index].day : days[index].day)
        that.triggerEvent('doChange', value)
      }
    },
    closeCalendar: function () {
      var that = this
      that.setData({
        show: false
      })
      setTimeout(function () {
        that.triggerEvent('doClose')
      }, 400)
    }
  },
  attached: function () {
    this.loadData()
  }
})