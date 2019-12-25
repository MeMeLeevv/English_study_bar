<template>
  <div id="users">
    <div class="wrapper">
      <!--   <div>
    <input class="inputtext" v-model="userData.account" type="text" placeholder="账号：手机号/邮箱" />
  </div>

  <div>
    <input class="inputtext" v-model="userData.password" type="password" placeholder="密码" />
      </div>-->
      <el-form
        :model="userData"
        status-icon
        :rules="userRules"
        ref="userData"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="userData.account"
            autocomplete="off"
            placeholder="账号：手机号/邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="userData.password"
            autocomplete="off"
            placeholder="请输入6-18位的密码"
          ></el-input>
        </el-form-item>
      </el-form>

      <div style="margin-top:6%">
        <!-- <slot name="item-resign"></slot>
        <slot name="item-forgetpassword"></slot> @click="btnClick(item)"-->
        <!-- <el-button style="color:ffffff;margin-left:8%;border:0;" >注册</el-button>
        <el-button style="color:ffffff;margin-left:40%;border:0;">忘记密码？</el-button>-->
        <slot name="item-resign"></slot>
        <slot name="item-forgetpassword"></slot>
      </div>
      <el-button class="butlog" @click="submitForm('userData')">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'users',
  props: {
    // 动态路径
    path: String
  },
  data () {
    var account = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      if (
        !/^1[3456789]\d{9}$/.test(value) &&
        !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(
          value
        )
      ) {
        return callback(new Error('请输入正确的手机号或者邮箱！'))
      }
      callback()
    }
    return {
      userData: {
        account: '1045413757@qq.com',
        password: '123456'
      },
      userRules: {
        account: [{ validator: account, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 管理者只能后台注册账户，前台只能登录，否则联系后台人员
      // 先查询是否有此用户
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = {
            // 新用户初始化数据
            account: this.userData.account,
            password: this.userData.password
          }
          let data = {
            collectName: 'userDatas', // setModel中导出的实例
            data: user
          }
          this.$emit('login', data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // itemClick () {
    //   this.$router.push(this.path)
    //   console.log(this.path)
    // },
    // btnClick(item){
    //   this.$emit('itemClick')
    // }
  }
}
</script>

<style  lang="scss">
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
.butlog {
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
  border-radius: 10px;
}
</style>
