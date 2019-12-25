<template>
  <div class="showlesson">
      <div class="container">
        <div class="addLesson" @click.stop="addLesson">
          <i class="iconfont icon-jia-" :class="!posiONavi?'positiveCircle':'nagetiveCircle'" @mouseout="iconCircle" @mouseenter="iconCircle"></i>
        </div>
        <el-main v-for="(item,index) in lessons" :key="item._id">
          <div class="lessonWrapper">
            <img v-if="item.file" class="img-response" :src="`/api/images/${item.file.filename}`" />
            <div class="info">
              <div>
                <div class="title" :title="item.name">{{item.name}}</div>
              </div>
              <div class="lessonInfo" :title="item.info">简介 : {{item.info}}</div>
              <div class="lessonInfo" :title="item.category">分类 : {{item.category}}</div>
              <div class="lessonInfo" :title="item.degree">难度 : {{item.degree}}</div>
              <div class="time">上传时间 : {{item.uploadTime}}</div>
            </div>
            <div class="btnGroup">
              <div @click="goLessonEdit(item._id)">编辑介绍</div>
              <div @click="gosectionEdit(item._id)">编辑目录</div>
            </div>
            <i @click.stop="deleteLesson(item._id,index)" class="iconfont icon-shanchu"></i>
          </div>
        </el-main>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'showlesson',
  data () {
    return {
      posiONavi: 1,
      lessons: [{
        id: '12345', // 便于查找，跟随时间随机生成
        cover: 'https://cn.bing.com/th?id=OIP.D1oqYUSFsh5bfCYbQw6J0wAAAA&pid=Api&rs=1', // 封面
        name: '课程题目课程题目课程题目课程题目课程题目课程题目课程题目课程题目课程题目课程题目课程题目课程题目', // 课程题目
        info: '课程介绍阿萨德科技吧，魔女之家还是沃尔沃二号门豆腐脑卡和计划如任何事都是空间大家二号门豆腐脑卡和计划如任何事都是空间大家二号门豆腐脑卡和计划如任何事都是空间大家二号门豆腐脑卡和计划如任何事都是空间大家', // 课程介绍
        type: '免费', // 课程类型
        price: '0', // 课程价格
        clickNum: '343', // 课程点击数
        paymentNum: '0', // 课程付款人数
        contentId: '112233',
        uploadTime: '2019-10-01', // 上传时间
        comment: [{
          menberId: '',
          avatar: 'https://cn.bing.com/th?id=OIP.D1oqYUSFsh5bfCYbQw6J0wAAAA&pid=Api&rs=1',
          nickname: 'srdsdf',
          content: 'sdddddddddddddddddddddddddddddddd',
          zhan: [], // 保留赞的人的id号
          cai: [] // 同上
        }],
        teacherId: '23456',
        degree: '中度', // 难度
        duration: '18h' // 时长
      }],
      lessonContent: [{
        id: '112233',
        content: [{
          chapter: '',
          title: '',
          info: '',
          section: [{
            title: '',
            isImage: false,
            fileName: ''
          }]
        }]
      }],
      teacher: [{
        id: '23456',
        class: '著名前端工程师', // 哪一类的讲师
        info: '二号门豆腐脑卡和计划如任何事都是空间大家',
        avater: 'https://cn.bing.com/th?id=OIP.D1oqYUSFsh5bfCYbQw6J0wAAAA&pid=Api&rs=1',
        hasLesson: ['12345']// 保存课程id
      }]
    }
  },
  created () {
    let that = this
    this.$axios({
      /* 这里顺便要加上用户的id */
      method: 'get',
      url: '/api/getTheLessons',
      params: {
        collectName: 'lessonInfos',
        category: 'CET4'
      }
    })
      .then(res => {
        if (res.status === 200) {
          /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
          let data = res.data
          this.lessons = data.reverse()
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
  },
  computed: {
    ...mapGetters(['getUserData', 'getScreenWidth'])
  },
  components: {},
  methods: {
    gosectionEdit (id) {
      this.$router.push(`/lessonDetailEditG?_id=${id}&width=${this.getScreenWidth}`)
    },
    goLessonEdit (id) {
      this.$router.push(`/lesonInfoEditG?_id=${id}`)
    },
    iconCircle () {
      this.posiONavi = !this.posiONavi
      // console.log(this.posiONavi, 'ppp')
    },
    showToast (text, successFun, cancelFun = () => {}) {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(successFun).catch(cancelFun)
    },
    addLesson () {
      this.showToast('此操作将创建一个课程, 是否继续?', () => {
        this.$router.push('/lesonInfoEditG')
      })
    },
    deleteLesson (id, index) {
      let that = this
      this.showToast('此操作将删除一个课程, 是否继续?', () => {
        this.$axios({
        /* 这里顺便要加上用户的id */
          method: 'get',
          url: '/api/remove',
          params: {
            collectName: 'lessonInfos',
            _id: id
          }
        })
          .then(res => {
            if (res.status === 200) {
            /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
              this.lessons.splice(index, 1)
            } else {
              that.$message({
                message: '删除失败！，请重试！',
                duration: '2000',
                type: 'error'
              })
            }
          })
          .catch(err => {
            that.$message({
              message: `删除失败！，出现错误！'${err}`,
              duration: '2000',
              type: 'error'
            })
          })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  *
    box-sizing: border-box
    transition: all .5s
  .showlesson
    display: flex
    justify-content: center
  .positiveCircle
    transform: rotate(90deg)
  .nagetiveCircle
    transform: rotate(-90deg)
  .container
    width: 80%
    dislay: flex
    align-self: center
    padding-top: 1.875rem
  .addLesson:hover
    cursor: pointer
  .lessonWrapper:hover
    cursor: pointer
  .addLesson
    width: 100%
    height: 6.25rem
    background-color: #E8E8E8
    text-align: center
    display: flex
    justify-content: center
    border-radius: .625rem
    i.icon-jia-
      display: flex
      font-size: 1.875rem
      align-self: center
      color: lightgray
  .el-main
    position: relative
    width: 100%
    display: flex
    justify-content: center
    padding: 2rem 0 1rem 0
  .lessonWrapper:hover
    transform: translate(0px,-10px)
  .lessonWrapper
    display: flex
    flex-direction: row
    justify-content: flex-start
    width: 98%
    height: 9.375rem
    border-radius:.625rem
    box-shadow: 0 0 1rem lightgray
    padding: .625rem
    img
      width: 8rem
      height: 8rem
      border-radius: .625rem
      align-self: center
    .info
      width: 50%
      display: flex
      flex-direction: column
      justify-content: space-around
      box-sizing: border-box
      margin: 0 .625rem
      .title
        font-size: 1.125rem
        font-weight: bold
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
      .lessonInfo
        color: gray
        font-size: .8125rem
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 3
      .time
        color: gray
        font-size: .8125rem
    .btnGroup
      align-self: center
      width: 20%
      text-align: center
      margin-left: 5%
      div
        height: 1.75rem
        line-height: 1.75rem
        font-size: 1rem
        background: #E8E8E8
        margin: 10px 0
        border-radius: .3125rem
      div:hover
        background: black
        color: #E8E8E8
    .icon-shanchu
      position: absolute
      font-size: 1.5rem
      color: gray
    .icon-shanchu:hover
      color: red
      transform: scale(1.1)
</style>
