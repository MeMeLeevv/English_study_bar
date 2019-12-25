<template>
<!-- 此页提示词这边需要优化，当overflow的时候才展示 -->
<div id="home">
  <lessoninfo1Preview hollWidth="1000"></lessoninfo1Preview>
</div>
</template>

<script>
import lessoninfo1Preview from './lessoninfoPreview'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {/* 注意 mounted 不会承诺所有的子组件也都一起被挂载。
  如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted： */
  },
  methods: { // elementUI的input挂载不了data-index = xxx
  },
  components: {
    lessoninfo1Preview
  }
}
</script>

<style lang="sass" scoped>
</style>
