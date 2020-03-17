Component({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {
    dateStart: '',
    dateEnd: '',
    dateId:''
  },
  properties: {
    newDate:{
      type: String,
      value:" "
    },
  },
  methods: {
    onselectDate (e) {
      let date = "false"
      let id = e.currentTarget.dataset.id
      this.setData({
        dateId: id
      })
      if (id == 1) {
        // this.setData({
        //   date: this.data.newDate
        // })
        date = this.data.newDate
      }else if (id == 2) {
        // this.setData({
        //   date: '全部'
        // })
        date = '全部'
      }else{
        this.setData({
          show: true,
          // selectDate: this.data.newDate
        })
      }
      this.triggerEvent('click', {
        date
      })
    },

    bindDateStart: function (e) {
      this.setData({
        dateStart: e.detail.value
      })
    },
    bindDateEnd(e) {
      this.setData({
        dateEnd: e.detail.value
      })
    },

   

    onClose () {
      this.setData({
        show: false
      })
    }
  }
})
