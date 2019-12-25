<template>
  <el-container style="height:2000px">
  <el-aside width="180px" height="2000px" class="leftcolor">
    <el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#1f1f1f"
      text-color="#fff"
      active-text-color="#eb7941">
     <el-menu-item index="1" >
        <i class="el-icon-menu"></i>
        <span slot="title">四级英语</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">六级英语</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">新闻更新</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">雅思集训</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-aside>
  <el-main >
    <!-- 只能管理者才能有权利访问这个页面 -->
    <showlesson></showlesson>
  </el-main>
  </el-container>
</template>
<script>
import showlesson from '../../components/showlesson/showlesson'

export default {
  name: 'Manageruploading',
  components: {
    showlesson
  }
}
</script>

<style lang="scss">
// 搜索框的css
  .tab-control {
    display: flex;
    text-align: center;
    font-family: "字体中国-锐博体V1";
    font-size:18px;
    color:white;
    line-height:57px;
    background-color:#1f1f1f;
  }
  .tab-control-item {
    flex:1;
  }
  .tab-control-item span {
    padding: 5px;
  }
.active {
  color: #eb7941;
  border-bottom: 3px solid #eb7941;
}
.colorbac {
  background-color:#1f1f1f;
}
</style>
