<template>
<!-- 两个并行的div顶部对不齐，原因：每个浏览器会有自己的一种定义布局的方式。有些默认上对齐，有些默认下对齐。
解决方法：两个div都设置vertical-align: top
 -->
<div class="Wrapper" :style="`width: ${getScreenWidth}px`">
    <lessonEdit radio="0.4" class="main"></lessonEdit>
    <!-- <memu class="memu"></memu> -->
</div>
</template>

<script>
import lessonEdit from '../../components/lessonEdit/lessonEdit'
import { mapGetters } from 'vuex'
// import memu from './memu'

export default {
  name: 'lessonDetailEditG',
  data () {
    return {
      title: '',
      degree: 0,
      info: ''
    }
  },
  computed: {
    ...mapGetters([
      'getScreenWidth'
    ])
  },
  components: {
    // memu,
    lessonEdit }
}
</script>

<style lang="sass" scoped>
*
  transition: all .5s
  box-sizing: border-box
.Wrapper
  margin-top: 20px
  .main
    display: inline-block
    width: 100%
    vertical-align: top
  .memu
    float: right
    width: 27%
    margin-left: 3%
    vertical-align: top
</style>
