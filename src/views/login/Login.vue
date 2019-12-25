<template>
  <div class="bg">
    <div class="box" style="color: white">
      <div v-if="loginCard">
        <div style="margin-top:5%"></div>
        <div class="nav">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            text-color="#a0a0a0"
            active-text-color="#e2743f"
            style="height: 100%;min-height:120%;margin-buttom: 0px;text-align:center;"
          >
            <el-menu-item style="margin-left: 29%;" index="1">
              <NavUsersandAdmi path="/loginusers">
                <div slot="item-test-users" @click.prevent="flag=true">用户</div>
              </NavUsersandAdmi>
            </el-menu-item>

            <el-menu-item index="2">
              <NavUsersandAdmi path="/loginAdministrator">
                <div slot="item-administrator" @click.prevent="flag=false">管理员</div>
              </NavUsersandAdmi>
            </el-menu-item>
          </el-menu>
        </div>

        <users v-if="flag" @login="login">
          <div
            slot="item-resign"
            style="width: 100%;text-align:left;float:left;display: block;margin-bottom: 8%"
            @click="loginCard=false"
          >
            <el-button style="color:ffffff;border:0">忘记密码？</el-button>
            <el-button style="color:ffffff;float: right;border:0;">注册</el-button>
          </div>
        </users>

        <Administrator v-else @login="login"></Administrator>
      </div>

      <div v-else>
        <register @setLogin="loginCard = true" @register="register"></register>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import users from './users'
import Administrator from './Administrator'
import register from './register'
import NavUsersandAdmi from './NavUsersandAdmi'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: {
    users,
    NavUsersandAdmi,
    Administrator,
    register
  },
  data () {
    return {
      input: '',
      input1: '',
      input2: '',
      input3: '',
      select: '',

      activeIndex: '1',
      activeIndex2: '1',
      flag: true,
      loginCard: true
    }
  },
  created () {
  },
  computed: {
    ...mapGetters([
      'getLastPath'
    ])
  },
  methods: {
    ...mapMutations([
      'setUserData',
      'setLastPath'
    ]),
    register: function (data) {
      let that = this
      // 发送注册请求
      this.$axios({
        /* 这里顺便要加上用户的id */
        method: 'post',
        url: '/api/register',
        data: data
      })
        .then(res => {
          if (res.status === 200) {
            let data = res.data // 注册成功后
            let msg, type
            /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
            if (data.code === '1') {
              console.log(data, '注册成功！')
              msg = '恭喜你，注册成功！'
              type = 'success'
            } else if (data.code === '2') {
              console.log(data, '重复注册！')
              msg = '已存在此账户，请登录！'
              type = 'warning'
            }
            this.$message({
              message: msg,
              type: type,
              duration: '2000',
              onClose: function () {
                // return login Page
                that.loginCard = true // 返回登录页面
              }
            })
          }
        })
        .catch(err => {
          console.log(err, 'submit error!')
        })
    },
    login (data) {
      let that = this
      // 发送注册请求
      this.$axios({
        /* 这里顺便要加上用户的id */
        method: 'post',
        url: '/api/login',
        data: data
      })
        .then(res => {
          if (res.status === 200) {
            let data = res.data // 注册成功后
            let msg, type
            /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
            if (data.code === '1') {
              console.log(data, '登录成功！')
              this.setUserData(data.data.data)
              msg = '恭喜你，登录成功！'
              type = 'success'
            } else if (data.code === '0' || data.code === '2') {
              console.log(data, '登陆失败！请重试！')
              msg = data.data.msg // 这里捕捉服务器返回的信息
              type = 'error'
            }
            this.$message({
              message: msg,
              type: type,
              duration: '2000',
              onClose: function () {
                if (type === 'success') { // 登陆成功，返回之前的页面
                  console.log(that.getLastPath, 'that.getLastPath')
                  if (that.getLastPath === '/error') {
                    that.setLastPath('/')
                  }
                  that.$router.push(that.getLastPath)
                }
                // return login Page
                // that.loginCard = true // 返回登录页面
              }
            })
          }
        })
        .catch(err => {
          console.log(err, 'submit error!')
        })
    }
  }
}
// methods: {
//   toggle () {
//     this.open = true
//   }
// }
</script>

<style lang="scss">
#register,
#users,
#Administrator {
  position: relative;
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 15%);
}
.bg {
  min-height: 100vh;
  background-image: url(../../assets/img/bg/bg.png);
}
.nav {
  margin-top: 50px;
  height: 50px;
}
.box {
  width: 400px;
  height: 400px;
  margin-top: 10%;
  margin-left: 40%;

  border-radius: 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: white;
  color: white;
}
.inputtext {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #dfdfdf;
  margin-top: 6%;
  width: 300px;
}
input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #a0a0a0;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: #a0a0a0;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: #a0a0a0;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: #a0a0a0;
}
.butlogin {
  margin-top: 7%;
  margin-left: 10%;
  background-color: fc884f;
  display: block;
  width: 80%;
  height: 50px;
  border: none;
  background: #fc884f;
  color: #ffffff;
  outline: none;
  font-size: 20px;
}
</style>
