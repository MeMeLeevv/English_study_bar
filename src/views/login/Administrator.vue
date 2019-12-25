<template>
  <div id="Administrator">
    <div class="wrapper">
      <el-form
        :model="AdminData"
        status-icon
        :rules="adminRules"
        ref="userData"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input type="text" v-model="AdminData.account" autocomplete="off" placeholder="账号：姓名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="AdminData.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>

      <div style="margin-top:6%">
        <el-button style="color:ffffff;border:0;">联系</el-button>
        <el-button style="color:ffffff;border:0;float: right;">忘记密码？</el-button>
      </div>
      <el-button class="butlogin" @click="submitForm('userData')">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Administrator',
  props: {
    // 动态路径
    path: String
  },
  data () {
    return {
      AdminData: {
        account: 'admin',
        password: '123456'
      },
      adminRules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    itemClick () {
      this.$router.push(this.path)
      console.log(this.path)
    },
    submitForm (formName) {
      // 管理者只能后台注册账户，前台只能登录，否则联系后台人员
      // 先查询是否有此用户
      this.$refs[formName].validate(valid => {
        if (valid) {
          let admin = {
            // 新用户初始化数据
            account: this.AdminData.account,
            password: this.AdminData.password,
            // price: { type: String, required: true, unique: true },
            name: 'admin',
            avatar:
              'https://att2.citysbs.com/hangzhou/2018/11/22/19/middle_440x440-190045_v2_17701542884445294_e0fcd1f48f2ff9154447a1234e7f1c33.jpg'
          }
          let data = {
            collectName: 'administrators', // setModel中导出的实例
            data: admin
          }
          this.$emit('login', data)
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
.inputtext {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #dfdfdf;
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
