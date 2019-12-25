<template>
  <div class="richEditor">
    <div>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import { Quill } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'richEditor',
  props: {
    contentCopy: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      }
    }
  },
  created () {
    if (this.contentCopy) {
      this.content = this.contentCopy
    }
  },
  watch: {
    content: function (newValue, oldValue) {
      // 子组件双向绑定传值给父组件每当str的值改变则发送事件update:word , 并且把值传过去
      this.$emit('update:content', newValue)
    },
    contentCopy: function (newV, oldV) { // 上面的content.sync执行的是子组件有变化就触发父组件的content值，并传入新值，但是父组件要传值子组件就不行
      if (!this.content) { // 于是这里检测父组件传来的contentCopy，然后如果他有变化，而content没有值就赋值给content
        this.content = newV
      }
    }
  },
  mounted () {
    document.querySelector('.ql-container.ql-snow').style.minHeight = '20rem' // 初始化编辑器的高度
    document.querySelector('.ql-toolbar.ql-snow').style.border = 'none' // 初始化编辑器的高度
    document.querySelector('.ql-container.ql-snow').style.border = 'none' // 初始化编辑器的高度
    document.querySelector('.ql-toolbar.ql-snow').style.borderBottom = '1px solid #ccc' // 初始化编辑器的高度
  },
  computed: {
    contentCode () {
      return hljs.highlightAuto(this.content).value
    }
  },
  methods: {
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    }
  }
}
</script>

<style>
</style>
<style lang="sass" scoped>
.richEditor
  .quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor
    height: 30rem
    padding-bottom: 1rem

  .quill-editor,
  .quill-code
    width: 100%
    float: left
  .quill-editor
    border: 0
    box-shadow: 0 0 1rem lightgray
  .quill-code
    height: auto
    border: none
    .title
      border: 1px solid #ccc
      border-left: none
      height: 3em
      line-height: 3em
      text-indent: 1rem
      font-weight: bold
    code
      width: 100%
      margin: 0
      padding: 1rem
      border: 1px solid #ccc
      border-top: none
      border-left: none
      border-radius: 0
      height: 30rem
      overflow-y: auto
</style>
