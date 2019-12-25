<template>
  <div id="app">
    <el-container style="background: white;height: 100%;min-height:100vh;" direction="vertical">
      <header-one style="margin:0;padding:0;"></header-one>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { throttle } from './common/js/base'
import HeaderOne from './components/header/HeaderOne'

export default {
  data () {
    return {
      currentDate: new Date(),
      activeName: 'second'
    }
  },
  watch: {
    $route (to, from) {
      this.setLastPath(from.path ? from.path : '/') // 设置返回路径,不存在则默认返回首页
      console.log(to, 'to')
      console.log(from, 'from') // 此处的from需要赋值给login登陆成功后返回的原始页面，如果没有则默认返回首页
      // this.hasRight(this.getUserData.right, to.path) // 检测用户的访问路径
    }
  },
  computed: {
    ...mapGetters([
      'getUserData'
    ])
  },
  created () {
    let that = this
    that.$axios({
      // 一开始加载页面先询问是否登录已过期
      /* 这里顺便要加上用户的id */
      method: 'get',
      url: '/api/'
    }).then(res => {
      if (res.status === 200) {
        let data = res.data // 获取数据成功后
        /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
        if (data.code === '1') {
          this.setUserData(data.data.data) // 全局储存用户数据
          /* 这里需要区分访问地址权限 */
          that.$message({
            message: data.data.msg,
            type: 'success',
            duration: '2000',
            onClose: function () {
              console.log(data, 'data')
              // return login Page
              // that.loginCard = true // 返回登录页面
            }
          })
        }
      }
    }).catch(err => {
      console.log(err, 'submit error!')
    })
  },
  mounted () {
    const that = this /* 存在闭包这个词法作用域，每个闭包都有自己的this，如果想要外层的this，需要提前保存 */
    let throttled = throttle([that.resetWindowWAH], 500)
    throttled()
    this.$nextTick(function () {
      window.onresize = () => {
        throttled()
      }
      // Code that will run only after the
      // entire view has been rendered DOM渲染完成之后
    })
  },
  methods: {
    ...mapMutations(['setScreenWidth', 'setUserData', 'setLastPath']),
    hasRight (right, toPath) {
      let noRightPath, msg
      if (right === undefined || right === 0) { // 游客，无法访问个人中心，提示登录
        noRightPath = ['/management', '/LearnManag']
        msg = '您暂时无权访问，请登录！'
      } else if (right === 1) { // 会员，无权访问管理者页面
        noRightPath = ['/management']
        msg = '您暂时无权访问！'
      } else if (right === 2) { // 管理者，没有个人中心
        noRightPath = ['/LearnManag']
        msg = '您无法访问此页面！'
      }
      if (noRightPath.indexOf(toPath) !== -1) { // 访问限制
        this.$router.push('/error')
        this.$message({
          message: msg,
          type: 'error',
          duration: '3000',
          onClose: function () {
            return false
          }
        })
      } else {
        return true
      }
    },
    resetWindowWAH () {
      // 传递this作用域
      /* 全局变量不能通过delete删除，而window属性上定义的变量可以通过delete删除：
       尝试访问未声明的变量会报错，xxx is not defined。
        但是通过查询window查询，可以知道某个可能未声明的变量是否存在，不会报错，只会显示undefined。
       在函数中使用var定义的变量是局部变量。
        有时想要在外部也访问到函数里面的变量，就需要定义window对象属性。
     */
      this.setScreenWidth(document.body.clientWidth) // 保存到window全局函数中
    }
  },
  components: {
    HeaderOne
  }
}
</script>
<style src='./assets/font/iconfont.css'></style>
<style lang="sass">
*
  transition: all .5s
  box-sizing: border-box
  .img-response
    display: inline-block
    height: auto
    max-width: 100%
    object-fit: cover
button.el-button:focus, button.el-button:hover
  color: black
  border: 2px solid black
  background: white

img
  display: inline-block

</style>
