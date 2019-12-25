<template>
  <div id="register">
    <div class="wrapper">
      <div class="title">用户</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
      <el-form-item prop="account">
          <el-input v-model="ruleForm.account"  placeholder="账号：手机号/邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"  placeholder="请输入6-18位的密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
      </el-form>

      <div style="margin-top:6%;text-align: center">
        <el-button style="color:ffffff;border:0;" @click="$emit('setLogin')">返回登陆</el-button>
      </div>
      <el-button class="butlogin" @click="submitForm('ruleForm')">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {/* 注册逻辑：1、待前台输入都是正确的之后，后台逻辑要先查询是否存在，有则返回说已注册，请登录，否则就插入新的数据，然后跳转到登陆页面 */
  name: 'register',
  props: {
    // 动态路径
    path: String
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6 || value.length > 18) {
          return callback(new Error('长度请在6-18位！'))
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var account = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      if (!(/^1[3456789]\d{9}$/.test(value)) && !(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value))) {
        return callback(new Error('请输入正确的手机号或者邮箱！'))
      }
      callback()
    }
    return {
      ruleForm: {
        password: '123456',
        checkPass: '123456',
        account: '13560979983'
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: account, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    itemClick () {
      this.$router.push(this.path)
      console.log(this.path)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let users = { // 新用户初始化数据
            account: this.ruleForm.account,
            password: this.ruleForm.password,
            // price: { type: String, required: true, unique: true },
            name: 'admin',
            avatar: 'https://img2.woyaogexing.com/2019/12/03/b8becd2a5da34a6684b5c1af5b9e2fbb!400x400.jpeg',
            learned: [], // 学习进度，{id:'',progress:2}每学一个课时就加一
            star: [], // 收藏
            buyed: [], // 已购课程
            right: 1 // 权利
          }
          let data = {
            collectName: 'userDatas', // setModel中导出的实例
            data: users
          }
          this.$emit('register', data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  lang="scss">
#register {
  position: relative;
}
.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 15%);
}
.demo-ruleForm {
  margin-top:20px;
}
.title {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: black;
}
.inputtext {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #dfdfdf;
  margin-top: 6%;
  width: 300px;
}
.inputzhuce {
  border: 0;
  margin-top: 6%;
  width: 300px;
}
input:focus {
  outline: none;
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
  border-radius: 10px;

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
