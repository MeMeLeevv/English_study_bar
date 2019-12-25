<template>
  <div id="app">
    <!-- 滑条响应 -->
    <div id="header-one">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <!-- 之后别忘了加入跳转到主页的链接 -->
            <HeadHome-Pic path="/home">
              <img class="imgwidth" slot="study-bar-pic" src="../../assets/img/tabbar/ICON.png" alt />
            </HeadHome-Pic>
          </div>
        </el-col>

        <!-- 复合型搜索框 -->
        <el-col :span="6">
          <div class="grid-content bg-purple-light" style="line-height: 60px">
            <div>
              <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style>
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="课程" value="1"></el-option>
                  <el-option label="老师" value="2"></el-option>
                  <el-option label="机构" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </el-col>

        <el-col :span="9">
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#1f1f1f"
            text-color="#fff"
            active-text-color="#e2743f"
            style="height: 100%;min-height:120%;margin-buttom: 0px;text-align:center;border: 0"
          >
            <el-menu-item style="margin-left: 20%;" index="1">
              <Nav-MenuEnglish path="/testEnglish">
                <div slot="item-test-English" class="textcolNav">考试英语</div>
              </Nav-MenuEnglish>
            </el-menu-item>

            <el-menu-item index="2">
              <Nav-MenuEnglish path="/culture">
                <div slot="item-culture" class="textcolNav">美国文化</div>
              </Nav-MenuEnglish>
            </el-menu-item>

            <el-menu-item index="3" v-if="getUserData.right === 1"> <!-- 只有会员才有个人中心 -->
              <Nav-MenuEnglish path="/LearnManag">
                <div slot="item-learnmanag" class="textcolNav">学习管理</div>
              </Nav-MenuEnglish>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="3">
          <div class="grid-content bg-purple-light">
            <div style="float:left;margin: 0 10px" v-if="getUserData.avatar">
              <img class="imgwidth2" :src="getUserData.avatar" alt />
              <span style="margin: 0 5px;display: inline-block;color: white;line-height: 60px;vertical-align: top">{{getUserData.name}}</span>
              <span v-if="getUserData.right !== 2" @click="logout" style="margin: 0 5px;display: inline-block;color: white;line-height: 60px;vertical-align: top">登出</span>
            </div>

            <Nav-MenuEnglish v-if="!getUserData.account" path="/login" :style="`${!getUserData.account ? 'float: right':'float:left'}`"
            style="line-height: 60px;color: white;margin: 0 30px">
              <div slot="item-login" class="textcolNav">登录</div>
            </Nav-MenuEnglish>

            <!-- 注意没有登录状况 -->
            <Nav-MenuEnglish
              v-if="getUserData.right === 2"
              path="/management"
              style="float:left;line-height: 60px;margin-left: 3%;color: white;"
            >
              <div slot="item-login" class="textcolNav">管理</div>
            </Nav-MenuEnglish>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import NavMenuEnglish from './NavMenuEnglish'
import HeadHomePic from './HeadHomePic'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderOne',
  components: {
    NavMenuEnglish,
    HeadHomePic
  },
  data () {
    // 搜索框的数据
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',

      activeIndex: '0',
      activeIndex2: '0'
    }
  },
  created () {
    console.log(this.$route.path, 'path')
  },
  computed: {
    ...mapGetters(['getUserData'])
  },
  methods: {
    logout () { // 登出
      let that = this
      this.$axios({
        /* 这里顺便要加上用户的id */
        method: 'get',
        url: '/api/logout'
      })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              message: '登出成功！',
              type: 'success',
              duration: '2000',
              onClose: function () {
                that.$router.go(0)
                // return login Page
                // that.loginCard = true // 返回登录页面
              }
            })
          }
        })
        .catch(err => {
          console.log(err, 'submit error!')
        })
    },
    // 导航栏
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
#Nav-MenuEnglish:hover {
  cursor: pointer;
}
#header-one {
  background: #1f1f1f;
}
// 搜索框的css
.imgwidth {
  width: auto;
  height: 50px;
  margin-top: 4px;
}
.imgwidth2 {
  width: 50px;
  height: 50px;
  margin-top: 4px;
  border-radius: 50%;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #1f1f1f;
}
// 顶层栏
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg-purple-dark {
  background: #1f1f1f;
}
.bg-purple {
  background: #1f1f1f;
}
.bg-purple-light {
  background: #1f1f1f;
}
.grid-content {
  border-radius: 0px; // 边边圆角
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 60px;
}
.row-bg {
  //padding: 10px 0;
  background-color: #1f1f1f;
}
// 搜索栏
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

// 语言
.el-dropdown-link {
  cursor: pointer;
  color: rgb(112, 112, 112);
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.textcolNav {
  font-size: 18px;
  font-family: "字体中国-锐博体V1";
}
</style>
