<template>
<!-- 此处视频大小需要响应式，依据屏幕大小进行适当调节 -->
    <div class="sectionEdit">
      <previewAnSave @submit="submit" @preview="preview"></previewAnSave>
      <div class="inlineBlock">
        <form action="" class="form">
        <uploadFile :src="sectionData.file.filename" :isVideo="true" :radio="radio" @getFileName="getFileName"></uploadFile>
          <!-- v-bind: 双引号内放变量或者字符串加变量或者加{}模板内放js语句({ red: isRed })或者加[]数组表都存在[classA, { classB: isB, classC: isC }] -->
          <el-input name="secTitle"  v-model="sectionData.secTitle" placeholder="请输入小节标题"></el-input>
        </form>
        <richEditor :content.sync="sectionData.content" :contentCopy="sectionData.content" class="rich"></richEditor>
      </div>
    </div>
</template>

<script>
import richEditor from '../richEditor/richEditor'
import uploadFile from '../uploadFile/uploadFile'
import previewAnSave from '../previewAnSaveBtn/previewAnSaveBtn'
// import { storeLocalData } from '../../common/js/base' // 不需要加this
import { mapGetters } from 'vuex'

// import { getLocalData } from '../../common/js/base' // 不需要加this
// storeLocalData
/* import Qs from 'qs' */

export default {
  name: 'sectionEdit',
  props: {
    radio: {
      type: String,
      default: '0.7'
    },
    cindex: {
      type: String,
      default: '0'
    },
    sindex: {
      type: String,
      default: '0'
    },
    sectionData: { // 父组件传进来的数据
      type: Object,
      default: function () {
        return {
          file: {
            id: '',
            filename: ''
          },
          secTitle: '',
          hasLearned: false,
          content: '',
          disabled: false,
          publicTime: ''
        }
      }
    }
  },
  data () {
    return {
      imageUrl: '',
      videoHe: '',
      videoWi: '',
      screenWidth: '',
      screenHeight: ''
    }
  },
  created () {
  },
  computed: {/* 注意 mounted 不会承诺所有的子组件也都一起被挂载。
  如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted： */
    ...mapGetters([/* 在upload那里的screenWidth提取到app.js那边去 */
      'getScreenWidth',
      'getUserData'
    ])
  },
  mounted () {
    const that = this /* 存在闭包这个词法作用域，每个闭包都有自己的this，如果想要外层的this，需要提前保存 */
    that.$nextTick(function () {
    // Code that will run only after the
    // entire view has been rendered DOM渲染完成之后
    })
  },
  methods: {
    getFileName (file) {
      this.sectionData.file = file
      console.log('getFather!')
    },
    preview () {
      let date = new Date()
      this.sectionData.publicTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      console.log(this.sectionData, 'form')
      this.$emit('setSectionData', this.sectionData)

      // storeLocalData([['sectionData', this.sectionData]])
      this.$router.push({
        path: '/sectioninfoPreview',
        query: { state: '0', width: this.getScreenWidth }
      }) // state表示进入页面的状态0：编辑-》预览 1： 查看-》预览
      //  this.$router.push('/sectioninfoPreview')
    },
    submit () {
      this.$emit('submit')
    }

  },
  components: {
    richEditor,
    uploadFile,
    previewAnSave
  }
}
</script>

<style lang="sass" scoped>
.sectionEdit
  .previewAnSave
    width: 10%
    vertical-align: top
  .inlineBlock
    display: inline-block
    margin-left: 35px
  .form
    width: 100%
    height: auto
    box-sizing: border-box
    box-shadow: 0 0 1rem lightgray
    padding: 10px
    .el-input
      margin-top: 10px
      background: lightgray
      font-size: 1rem
      color: gray
    .el-input::placeholder
      text-align: center
  .rich
    margin-top: 30px
</style>
