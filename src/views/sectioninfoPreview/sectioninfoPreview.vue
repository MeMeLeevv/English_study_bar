<template>
<!-- 此页提示词这边需要优化，当overflow的时候才展示 -->
<div id="sectioninfoPreview" style="margin: 0 auto; margin: 30px auto">
  <i class="iconfont icon-icon--fanhui back" @click="back" title="退出预览"></i>
  <div class="main">
    <div class="img" :style="`width: ${hollWidth * 0.9}px;height: ${hollWidth * 0.9 * 0.5}px`">
      <img v-if="isimage" :src="`http://localhost:8080/api/images/${form.file.filename}`" alt="">
      <video v-if="isVideo" :src="`http://localhost:8080/api/videos/${form.file.filename}`" :width="`${hollWidth}px`" :height="`${hollWidth * 0.5}px`"></video>
    </div>
    <div class="info">
      <div class="sectionMsg">
        <span class="title">{{form.title}}</span>
        <div class="teacher">
          <div class="top">
            <img :src="teacher.avatar" alt="">
            <span class="header">{{teacher.name}}</span>
          </div>
          <div class="time">发布时间 : {{form.publicTime}}</div>
        </div>
      </div>
      <div class="content">{{form.content}}</div>
    </div>
  </div>
  <memu :style="`width: ${hollWidth * 0.35}px`"></memu>
</div>
</template>

<script>
import { isVideoFile, isImage, getLocalData } from '../../common/js/base'
import { mapGetters } from 'vuex'
import memu from '../../components/memu/memu'
export default {
  name: 'sectioninfoPreview',
  data () {
    return {
      hollWidth: '',
      form: {
        isVideo: false,
        isimage: false,
        filename: 'https://mindsparklemag.com/wp-content/uploads/2018/01/2018-Design-Trends-mindsparkle-mag.jpg',
        title: 'bababababa',
        // learned: true,
        // info: '4444'
        publicTime: '2019-03-04', /* 发表时间 */
        content: '<p>12344</p>',
        teacherId: '1234'
      },
      teacher: {
        avatar: 'https://mindsparklemag.com/wp-content/uploads/2018/01/2018-Design-Trends-mindsparkle-mag.jpg',
        name: '喵老师',
        info: '他是一个专业的老师',
        tid: '1234'
      }
    }
  },
  props: {
    /*     hollWidth: {
      type: String,
      defalut: '1000'
    } */
  },
  created () {
    /* 请求拉到数据后，先判断文件是video还是图片 */
    this.hollWidth = this.$route.query.width > 1000 ? 1000 : this.$route.query.width
    let state = this.$route.query.state
    this.state = state
    this.cindex = getLocalData(['cindex'])[0]
    this.sindex = getLocalData(['sindex'])[0]
    if (state === '0') { // 是编辑页面跳转过来的
      let form = getLocalData(['sectionData'])[0][this.cindex].sections[this.sindex]
      this.form = form
      let name = this.form.file.filename
      let ext = name.slice(name.lastIndexOf('.') + 1).toLowerCase()
      this.isVideo = isVideoFile(ext)
      this.isimage = isImage(ext)
      console.log(this.form, 'form sectionpre')
      this.teacher = this.getUserData
    }
  },
  mounted () {
    /* 将富文本的内容插入到文档流中 */
    document.querySelector('.content').innerHTML = this.form.content
  },
  computed: {/* 注意 mounted 不会承诺所有的子组件也都一起被挂载。
  如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted： */
    ...mapGetters([/* 在upload那里的screenWidth提取到app.js那边去 */
      'getScreenWidth',
      'getUserData'
    ])
  },
  methods: { // elementUI的input挂载不了data-index = xxx
    back () {
      this.$router.go(-1)
      // this.$emit('backFromPre')
    }
  },
  components: {
    memu
  }
}
</script>

<style lang="sass" scoped>
.back
  position: absolute
  top: 0
  right: -100px
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

#sectioninfoPreview
  position: relative
  .main
    display: inline-block
    margin-right: 20px
    .img
      margin-bottom: 10px
      img
        width: 100%
        height: 100%
        display: block
    .info
      .content
        padding: 20px
        box-shadow: 0 0 1rem lightgray
      .sectionMsg
        display: flex
        flex-direction: row
        justify-content: space-between
        .title
          margin: 0
          line-height: 76px
        .teacher
          display: inline-block
          .top
            height: 50px
            line-height: 50px
            img
              width: 50px
              height: 50px
              margin-right: 10px
              display: inlie-block
              border-radius: 50%
            .header
              vertical-align: top
              line-height: 50px
              height: 50px
              display: inline-block
          .time
            font-size: 14px
            margin: 5px 0
</style>
