<template>

  <div id="HeadHome-Pic" @click="itemClick">

    <!-- 导航菜单栏 -->
    <slot name="study-bar-pic"></slot>
    <!-- <el-menu-item path="/learnmanag" index="4">学习管理</el-menu-item> -->

  </div>

</template>

<script>
export default {
  name: 'HeadHomePic',
  props: {
    // 动态路径
    path: String
  },
  data () {
    return {
    }
  },
  methods: {

    itemClick () {
      this.$router.push(this.path)
      console.log(this.path)
    }
  }
}
</script>

<style  lang="scss">
</style>
