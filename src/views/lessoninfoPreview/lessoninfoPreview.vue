<template>
<!-- 此页提示词这边需要优化，当overflow的时候才展示 -->
<div id="lessoninfoPreview" :style="`width: ${hollWidth}px`">
  <div class="top">
    <i class="iconfont icon-icon--fanhui back" @click="$router.go(-1)" title="退出预览"></i>
     <div class="showCover" :style="`width: ${hollWidth*0.5}px;height: ${hollWidth*0.5*0.5}px;
     ${form.file ? `background-image: url(http://localhost:8080/api/images/${form.file.filename});}` : ''}`" ></div>
      <div class="msg" :style="`width:${hollWidth*0.4}px`">
        <div class="title">课程名称 : {{form.name}}</div>
        <div class="price text">价格 : {{form.price}}</div>
        <div class="duration text">时长 : {{form.duration}}h</div>
        <div class="degree text">等级 : {{form.degree}}</div>
        <div class="time text">发布时间 : {{form.uploadTime}}</div>
        <p class="info text ellipsis" :title="form.info">{{form.info}}</p>
        <el-button v-if="state !== '0'">购买</el-button>
        <el-button @click="stared(form._id)" v-if="state !== '0'">{{star ? '已收藏' : '收藏'}}</el-button>
      </div>
  </div>
  <div class="richEditor" :style="`width: ${hollWidth * 0.6}px`">
    <div class="header">课程介绍</div>
    <div class="content"></div>
  </div>
  <div class="aside" :style="`width: ${hollWidth * 0.35}px`">
    <div class="teacher">
      <div class="header">授课教师</div>
      <div class="tInfo">
        <img :src="teacher.avatar" alt="">
        <div class="tMsg">
          <div>{{teacher.name}}</div>
          <div>{{teacher.desc}}</div>
        </div>
      </div>
    </div>
    <memu class="memu" :state="state" style="width:100%"></memu>
  </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import memu from '../../components/memu/memu'
import { getLocalData } from '../../common/js/base' // 不需要加this

export default {
  name: 'lessoninfoPreview',
  data () {
    return {
      star: false,
      userData: {},
      form: {
        cover: 'https://mindsparklemag.com/wp-content/uploads/2018/01/2018-Design-Trends-mindsparkle-mag.jpg',
        name: 'bababababa',
        price: '$20',
        duration: '12',
        degree: '中级',
        // info: '4444'
        info: 'XXXXXXXXXccccccccccccccccccccccccccccccccccXXXXXXccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccXXXXXccccccccccccccccccccccccccccccccccccccccccccccccccccccccXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        content: '<p>12344</p>'
      },
      teacher: {
        avatar: 'https://mindsparklemag.com/wp-content/uploads/2018/01/2018-Design-Trends-mindsparkle-mag.jpg',
        name: '喵老师',
        desc: '他是一个专业的老师',
        tid: '12'
      }
    }
  },
  props: {
    /* hollWidth: {
      type: Number,
      defalut: 1000
    } */
  },
  created () {
    this.hollWidth = this.$route.query.width
    let state = this.$route.query.state
    this.state = state
    console.log(this.getUserData, 'this.getUserData')

    if (state === '0') { // 是编辑页面跳转过来的
      let form = getLocalData(['lessonInfo'])[0]
      this.form = form
      this.teacher = this.getUserData
    } else if (this.getUserData.right === 1) {
      let that = this
      let id = this.$route.query.id
      this.userData = this.getUserData
      this.hollWidth = this.$route.query.width
      console.log(this.userData, 'this.userData')

      if (this.userData.star.indexOf(id) !== -1) { // 收藏
        this.star = true
      } else {
        this.star = false
      }
      this.$axios({
      /* 这里顺便要加上用户的id */
        method: 'get',
        url: '/api/getTheLessons',
        params: {
          collectName: 'lessonInfos',
          _id: id
        }
      })
        .then(res => {
          if (res.status === 200) {
          /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
            let data = res.data[0]
            this.form = data
            document.querySelector('.content').innerHTML = this.form.content
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
    } else {
      let that = this
      let id = this.$route.query.id
      this.hollWidth = this.$route.query.width
      this.$axios({
      /* 这里顺便要加上用户的id */
        method: 'get',
        url: '/api/getTheLessons',
        params: {
          collectName: 'lessonInfos',
          _id: id
        }
      })
        .then(res => {
          if (res.status === 200) {
          /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
            let data = res.data[0]
            this.form = data
            document.querySelector('.content').innerHTML = this.form.content
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
  },
  mounted () {
    /* 将富文本的内容插入到文档流中 */
    document.querySelector('.content').innerHTML = this.form.content
    // 设置richEditor里的图片大小，限制其小于等于父元素大小
    /* let imgs = document.querySelectorAll('.content img')
    for (let i = 0; i < imgs.length; i++) {
      console.log(imgs[i], 'imgs[i]00')

      if (imgs[i].style.width > this.hollWidth * 0.6) {
        imgs[i].style.display = 'inline-block'
        imgs[i].style.width = this.hollWidth * 0.6 - 40 // 40是padding值
        console.log(imgs[i].style, 'imgs[i]')
      }
    } */
  },
  computed: {/* 注意 mounted 不会承诺所有的子组件也都一起被挂载。
  如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted： */
    ...mapGetters([/* 在upload那里的screenWidth提取到app.js那边去 */
      'getScreenWidth',
      'getUserData'
    ])
  },
  methods: { // elementUI的input挂载不了data-index = xxx
    ...mapMutations([
      'setUserData'
    ]),
    stared (id) {
      let that = this
      this.star = !this.star
      if (this.star) { // 收藏
        this.userData.star.push(id)
      } else { // 取消收藏
        let index = this.userData.star.indexOf(id)
        this.userData.star.splice(index, 1)
      }
      this.setUserData(this.userData)
      console.log(this.getUserData, 'this.getUserData.star')

      let data = {
        collectName: 'userDatas',
        condition: { _id: this.getUserData._id },
        updata: this.userData
      }
      let url = '/api/updateUserData'
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
              message: '编辑成功！',
              duration: '2000',
              type: 'success'
            })
          } else {
            that.$message({
              message: '收藏失败！，请重试！',
              duration: '2000',
              type: 'error'
            })
          }
        })
        .catch(err => {
          that.$message({
            message: `收藏失败！，出现错误！'${err}`,
            duration: '2000',
            type: 'error'
          })
        })
    }
  },
  components: {
    memu
  }
}
</script>

<style lang="sass" scoped>
.time
  width: 100%
  height: 30px
  line-height: 30px
  color: black
.back
  position: absolute
  top: 0
  right: 0
  margin: 10px
  font-size: 32px
  font-weight: 600
  color: blue
.back:hover
  transform: scale(1.1)
  cursor: pointer
.header
    font-size: 18px
    font-weight: 700
.title
  font-size:  24px
  font-weight: 700
  margin: 0 20px 20px 0
.ellipsis /* 格式...冒号后面记得空一个格（: ***）否则可能会失效 */
  height: 60px
  overflow: hidden
  text-overflow: ellipsis
  -o-text-overflow: ellipsis
  display: -webkit-box // 将对象作为弹性伸缩盒子模型显示。
  word-break: break-all
  -webkit-box-orient: vertical  //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
  -webkit-line-clamp: 2 // 结合上面两个属性，表示显示的行数。

#lessoninfoPreview
  padding: 30px
.top
  display: flex
  position: relative
  flex-direction: row
  justify-content: center
  width: 100%
  padding: 20px
  background: white
  box-shadow: 0 0 1rem lightgray
  .showCover
    display: inline-block
    height: 300px
    vertical-align: top
    margin-right: 20px
    background-size: cover
  .msg
    display: inline-block
    align-self: center
    .text
      font-size: 18px
      line-height: 30px
      font-weight: 600
    .info
      margin-top: 20px
.richEditor
  vertical-align: top
  display: inline-block
  padding: 20px
  margin: 20px 0
  box-shadow: 0 0 1rem lightgray
.aside
  display: inline-block
  float: right
  padding: 20px 0
  .teacher
    padding: 10px
    margin-bottom: 20px
    box-shadow: 0 0 1rem lightgray
    .tInfo
      margin-top: 10px
      img
        display: inline-block
        width: 60px
        height: 60px
        border-radius: 50%
        margin-right: 10px
      .tMsg
        display: inline-block
        vertical-align: top
        div
          margin: 10px 0
  .memu
    margin-top: 10px
</style>
