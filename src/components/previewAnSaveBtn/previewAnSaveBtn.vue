<template>
<div class="previewAnSave">
    <div class="preview btn" @click="$emit('preview')">预览</div>
    <div class="save btn" @click="$emit('submit')">保存</div>
</div>
</template>

<script>

export default {
  name: 'previewAnSave',
  data () {
    return {
      title: '',
      degree: 0,
      info: ''
    }
  }
}
</script>

<style lang="sass" scoped>
$lineheight: 50px
$bgColor: #EB7941
.previewAnSave
  display: inline-block
  width: 100%
  .btn:hover
    cursor: pointer
  .btn
    height: $lineheight
    line-height: $lineheight
    color: white
    font-weight: 700
    font-size: 18px
    text-align: center
    background: $bgColor
    box-shadow: 0 0 1rem lightgray
  .save
    margin-top: 20px
</style>
