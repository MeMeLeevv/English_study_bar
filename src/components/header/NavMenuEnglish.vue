<template>

  <div id="Nav-MenuEnglish" @click="itemClick">

    <slot name="item-test-English"></slot>
    <slot name="item-culture"></slot>
    <slot name="item-learnmanag"></slot>
    <slot name="item-login"></slot>

    <slot name="item-manager"></slot>

  </div>

</template>

<script>
export default {
  name: 'NavMenuEnglish',
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
