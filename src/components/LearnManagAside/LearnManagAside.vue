<template>
<div id="Learn-Manag-Aside">
<el-col :span="24">
    <el-menu
      default-active="1"
      @select="select"
      class="el-menu-vertical-demo"
      background-color="#1f1f1f"
      text-color="#fff"
      active-text-color="#eb7941">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
     <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">学习进度</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">已购课程</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</div>
</template>

<script>
export default {
  name: 'LearnManagAside',
  // props: {
  //   // 动态路径
  //   path: String
  // },
  data () {
    return {
    }
  },
  methods: {
    select (index) {
      this.$emit('clickMenu', index)
    }
    /* select (index) {
      if (index === '1') {
        this.$router.push('/categoryCard?index=1')
      }
    } */
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
