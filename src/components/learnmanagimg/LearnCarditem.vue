<template>
  <div id="LearnCarditem">
      {{goods}}
  </div>

</template>

<script>

export default {
  name: 'LearnCarditem',
  props: {
    goods: {
      type: Array,
      default () {
        return[]
      }
    }
  }
}
</script>

<style lang="scss">

</style>
