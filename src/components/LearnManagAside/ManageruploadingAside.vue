<template>
<div id="ManageruploadingAside">
<el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#1f1f1f"
      text-color="#fff"
      active-text-color="#eb7941">
     <el-menu-item index="1">
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
</div>
</template>

<script>
export default {
  name: 'ManageruploadingAside',

  // props: {
  //   // 动态路径
  //   path: String
  // },
  data () {
    return {
    }
  }
  // methods: {

  //   itemClick () {
  //     this.$router.push(this.path)
  //     console.log(this.path)
  //   }
  // }

}
</script>

<style  lang="scss">

</style>
