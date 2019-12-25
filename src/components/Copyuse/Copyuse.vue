<template>

  <div id="Learn-Manag-Aside" @click="itemClick">

    <slot name="study-bar-pic"></slot>
  </div>

</template>

<script>
export default {
  name: 'LearnManagAside',
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
