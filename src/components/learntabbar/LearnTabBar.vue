<template>
  <div id="LearnTabBar" class="grid-content bg-purple-light">
    <el-row>
      <el-col :span="8">
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#1f1f1f"
    text-color="#fff"
    active-text-color="#e2743f"
    style="height: 100%;min-height:120%;margin-buttom: 0px;text-align:center;"
    >

      <el-menu-item style="margin-left: 20%;" index="1">
        <Nav-MenuEnglish >
          <div slot="item-test-English" class="textcol">
          我的学习
          </div>
        </Nav-MenuEnglish>
      </el-menu-item>

      <el-menu-item index="2">
        <!-- path="/culture"  -->
        <Nav-MenuEnglish >
          <div slot="item-culture" class="textcol">
          购买教程
          </div>
        </Nav-MenuEnglish>
      </el-menu-item>
    </el-menu>
    </el-col>

      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
        </div></el-col>
    </el-row>
  </div>

</template>

<script>

export default {
  name: 'LearnTabBar',
  components: {
  },
  data () {
    return {
      input1: '',
      input2: '',
      select: '',
      activeIndex: '1',
      activeIndex2: '1'
    }
  }
}
</script>

<style lang="scss">
// 搜索框的css
  .imgwidth {
    width: auto;
    height: 50px;
    margin-top: 4px;

  }
  .imgwidth2 {
    width: auto;
    height: 50px;
    margin-top: 4px;
  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #1f1f1f;
  }
// 栏
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 0px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
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
    border-radius: 0px;// 边边圆角
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    min-height: 60px;
  }
  .row-bg {
    //padding: 10px 0;
    background-color: #1f1f1f;
  }
  .textcol {
  font-family: "字体中国-锐博体V1";
  font-size:18px
}
</style>
