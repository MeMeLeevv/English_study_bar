<template>
<!-- 两个并行的div顶部对不齐，原因：每个浏览器会有自己的一种定义布局的方式。有些默认上对齐，有些默认下对齐。
解决方法：两个div都设置vertical-align: top
 -->
<div class="Wrapper">
    <sectionEdit @submit="submit" radio="0.6" @setSectionData="setSectionData" class="main" :sectionData="sectionData" :cindex="cindex" :sindex="sindex"></sectionEdit>
    <memu class="memu" @getMenuData="getMenuData" :menu="menu" @changeSection="changeSection" state="1"></memu>
</div>
</template>

<script>
import sectionEdit from '../../components/sectionEdit/sectionEdit'
import memu from '../../components/memu/memu'
import { storeLocalData, getLocalData } from '../../common/js/base' // 不需要加this

// import { getLocalData } from '../../common/js/base' // 不需要加this
/*
{ // 制定lessonInfo的数据规则
      lessonId: String,
      memuList: [
        {
          chapterTitle: String,
          disabled: Boolean,
          sections: [{
            file: {
              id:String,
              filename: String
            },
            secTitle: String,
            hasLearned: Boolean,
            content: String,
            disabled: Boolean
          }]
        }
      ]
    }
*/
export default {
  name: 'lessonDetailEditG',
  data () {
    return {
      title: '',
      degree: 0,
      info: '',
      cindex: '0',
      sindex: '0',
      menu: [// 初始化menu数据
        {
          chapterTitle: '',
          disabled: false,
          sections: [{
            sectionTitle: '',
            disabled: false
          }]
        }
      ],
      sectionData: { // 初始化section数据
        file: {
          id: '',
          filename: ''
        },
        secTitle: '',
        hasLearned: false,
        content: '',
        disabled: false,
        publicTime: ''
      },
      formData: { // 一加载就去数据库加载所有数据然后初始化
        lessonId: this.id,
        memuList: [
          {
            chapterTitle: '',
            disabled: false,
            sections: [{
              file: {
                id: '',
                filename: ''
              },
              secTitle: '',
              hasLearned: '',
              content: '',
              disabled: false,
              publicTime: ''
            }]
          }
        ]
      }
    }
  },
  /*   watch: {
    cindex: function (newV, oldV) {
      storeLocalData([['cindex', this.cindex]]) // 储存所有数据
    },
    sindex: function (newV, oldV) {
      storeLocalData([['sindex', this.sindex]]) // 储存所有数据
    }
  }, */
  created () {
    this.width = this.$route.query.width
    this.id = this.$route.query._id
    this.modify = true
    this.formData.lessonId = this.id
    let that = this
    this.$axios({
      // 这里顺便要加上用户的id
      method: 'get',
      url: '/api/getTheMemus',
      params: {
        collectName: 'menus',
        _id: this.id
      }
    })
      .then(res => {
        if (res.status === 200) {
          // 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          // 然后点击后进去具体lesson编辑页面
          let data = res.data
          console.log(data, 'getData1212 success')
          if (data.length === 0) { // 没有数据，展现初始化
            console.log(getLocalData(['sectionData'])[0], 'getLocalData')
            this.formData.memuList = getLocalData(['sectionData'])[0].length !== 0 ? getLocalData(['sectionData'])[0] : this.formData.memuList
          } else {
            this.formData = data[0]
          }
          console.log(this.formData, 'this.formData Group')
          // storeLocalData([['sectionData', []]]) // 储存所有数据
          storeLocalData([['sectionData', this.formData.memuList]]) // 储存所有数据
          console.log(this.formData.memuList, 'this.formData.memuList')
          this.setSectionData(this.formData.memuList[this.cindex].sections[this.sindex])
          this.sectionData = this.formData.memuList[this.cindex].sections[this.sindex]
          this.menu = this.formData.memuList
        } else {
          that.$message({
            message: '获取失败！，请重试！',
            duration: '2000',
            type: 'error'
          })
        }
      })
      .catch(err => {
        that.$message({
          message: `获取失败！，出现错误！'${err}`,
          duration: '2000',
          type: 'error'
        })
      }) /*  if (getLocalData(['memus'])[0]) { // 如果本地储存了lessonInfo，则表示是从预览页面返回的，否则，保存时候会将此数据清楚
      this.form = getLocalData(['memus'])[0]
      if (this.$route.query._id) {
        this.modify = true
        this._id = this.$route.query._id
      }
    } else {
      if (this.$route.query._id) {
      // 如果传进了_id，便是修改，能进编辑页面的只能是管理者新建lesson或者修改lesson
        this._id = this.$route.query._id
        this.modify = true
        let that = this
        this.$axios({
        // 这里顺便要加上用户的id
          method: 'get',
          url: '/api/getTheMemus',
          params: {
            collectName: 'memus',
            _id: this._id
          }
        })
          .then(res => {
            if (res.status === 200) {
            // 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
              // 然后点击后进去具体lesson编辑页面
              let data = res.data
              this.form = data[0]
              console.log(data, 'getData success')
            } else {
              that.$message({
                message: '获取失败！，请重试！',
                duration: '2000',
                type: 'error'
              })
            }
          })
          .catch(err => {
            that.$message({
              message: `获取失败！，出现错误！'${err}`,
              duration: '2000',
              type: 'error'
            })
          })
      }
    } */
  },
  methods: {
    submit () {
      let that = this
      this.formData.lessonId = this.id
      /* { collectName：xxx, data:xxx } */
      let data, url
      console.log(this.formData, 'this.formData')

      if (this.modify) { // 查找、修改数据
        data = {
          collectName: 'menus',
          condition: { _id: this.id },
          updata: this.formData
        }
        url = '/api/updateTheSection'
      }
      this.$axios({
        // 这里顺便要加上用户的id
        method: 'post',
        url: url,
        data: data
      })
        .then(res => {
          if (res.status === 200) {
            // 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          // 然后点击后进去具体lesson编辑页面
            let data = res.data
            console.log(data, 'update success')
            that.$message({
              message: '保存成功！',
              duration: '2000',
              type: 'success'
            })
            storeLocalData([['sectionData', []]])
            this.$router.push('/management')
          } else {
            that.$message({
              message: '保存失败！，请重试！',
              duration: '2000',
              type: 'error'
            })
          }
        })
        .catch(err => {
          that.$message({
            message: `保存失败！，出现错误！'${err}`,
            duration: '2000',
            type: 'error'
          })
        })
    },
    setSectionData (val) { // 设置从编辑预览页面传进来的数据
      this.formData.memuList[this.cindex].sections[this.sindex] = val
      storeLocalData([['sectionData', this.formData.memuList]]) // 储存所有数据
      console.log(this.formData, 'yulan')
    },
    getMenuData (val, cindex, sindex) { // 获取子组件menu的更改数据
      console.log(val, cindex, sindex, 'val, cindex, sindex')
      if (sindex !== undefined) {
        this.formData.memuList[cindex].sections[sindex].secTitle = val
      } else {
        this.formData.memuList[cindex].chapterTitle = val
      }
    },
    changeSection (cindex, sindex) { // menu点击进入对应section页面
      this.cindex = cindex + ''
      this.sindex = sindex + ''
      console.log(this.formData.memuList[cindex].sections[sindex], 'this.formData.memuList[cindex].sections[sindex]')
      this.sectionData = this.formData.memuList[cindex].sections[sindex] // 传入section数据
    }
  },
  components: {
    memu,
    sectionEdit
  }
}
</script>

<style lang="sass" scoped>
*
  transition: all .5s
  box-sizing: border-box
.Wrapper
  width: 100%
  margin-top: 20px
  .main
    display: inline-block
    width: 73%
    vertical-align: top
  .memu
    float: right
    width: 25%
    vertical-align: top
</style>
