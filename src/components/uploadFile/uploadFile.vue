<template>
  <!-- 此处视频大小需要响应式，依据屏幕大小进行适当调节 -->
  <div class="uploadFile" :style="`width: ${screenWidth * radio - 20}px`">
    <!-- v-bind: 双引号内放变量或者字符串加变量或者加{}模板内放js语句({ red: isRed })或者加[]数组表都存在[classA, { classB: isB, classC: isC }] -->
    <div ref="poster" class="showPoster" :style="`background-image: url(${bgSection});width: ${screenWidth * radio - 20}px; height: ${(screenWidth * radio - 20) / 2}px`">
      <span v-if="!bgSection && !videoSrc" class="tip posCenterOne">{{`${isVideo ? '请选择视频或者图片上传' : '请选择图片上传'}`}}</span>
      <input
        :title="`${isVideo ? '请选择视频或者图片上传' : '请选择图片上传'}`"
        class="posCenterOne"
        @change="uploadFile($event)"
        name="file"
        type="file"
      />
      <!-- file 输入框无法绑定 model,返回路径然后插入到data中 -->
      <video
        :height="((screenWidth * radio - 20)/2)+'px'"
        :width="(screenWidth * radio - 20)+'px'"
        controls
        v-if="videoSrc"
        :src="videoSrc"
      ></video>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isVideoFile, isImage } from '../../common/js/base'

export default {
  name: 'uploadFile',
  props: {
    radio: {
      type: String,
      default: '0.7'
    },
    isVideo: {/* true: 图片或者视频都可以，false: 只有图片可以上传 */
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      defalut: ''
    }
  },
  data () {
    return {
      imageUrl: '',
      secTitle: '',
      bgSection: '',
      // 存小节的图片
      videoSrc: '',
      hasLearned: false, // 是否学完了，这里还需要具体去实现
      videoHe: '',
      videoWi: '',
      screenWidth: '',
      screenHeight: ''
    }
  },
  created () {
    this.screenWidth = this.getScreenWidth
    console.log(this.src, 'src')
    if (this.src) { // 如果已有路径，先赋值
      this.bgSection = `/api/images/${this.src}`
    }
  },
  watch: {
    getScreenWidth: function (newVal, oldVal) {
      this.screenWidth = newVal
      console.log(this.screenWidth, 'this.screenWidth')
    },
    src: function (newV, oldV) { // 由于是异步请求图片地址，所以会有时差，在created捕捉不到，所以借助watch可以及时铺捉到变化的变量然后赋值
      this.bgSection = `/api/images/${newV}`
    }
  },
  mounted () {
    this.$nextTick(function () {
    })
  },
  computed: {
    /* 注意 mounted 不会承诺所有的子组件也都一起被挂载。
  如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted： */
    ...mapGetters([
      'getScreenWidth'
    ])
  },
  methods: {
    uploadFile (e) {
      let fileData = e.target.files[0] /* 这个是filelist对象，里面保存着file对象，axios我暂时发现不好发file对象 */
      /* 先检测格式是否正确 */
      let name = fileData.name
      let ext = name.slice(name.lastIndexOf('.') + 1).toLowerCase()
      let isImg = isImage(ext)
      let isVideo = isVideoFile(ext)
      if ((!isImg && !isVideo) || (!this.isVideo && !isImg)) {
        this.$message({
          message: '请选择正确的格式',
          duration: '2000',
          type: 'info',
          center: true
        })
        return false
      } /* 如果格式不正确不执行下面操作 */
      let formData = new FormData()
      formData.append('file', fileData)
      this.$axios({
        method: 'post',
        url: '/api/uploadFile',
        data: formData
      }).then(res => {
        if (res.status === 200) {
          let data = res.data
          this.$emit('getFileName', data)/* 触发父组件传值， */
          if (isImg) {
            this.bgSection = `/api/images/${data.filename}`
            this.videoSrc = ''
          } else {
            this.bgSection = ''
            this.videoSrc = `/api/videos/${data.filename}`
          }
          console.log(res, 'upload success')
        }
      }).catch(err => {
        console.log(err, 'upload error!')
      })
    },
    resetVideoSize () {
      this.videoWi = this.screenWidth * this.radio - 20 // 大小占整个屏幕的70%，再减去padding
      this.videoHe = this.videoWi / 2
      this.$refs.poster.style.height = this.videoHe + 'px'
    }

  },
  components: {}
}
</script>

<style lang="sass" scoped>
.posCenterOne
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  margin: auto
  z-index: 1

.uploadFile
  width: 100%
  height: auto
  box-sizing: border-box
  box-shadow: 0 0 1rem lightgray
  .showPoster
    width: 100%
    height: 20rem
    position: relative
    background: lightgray
    background-size: cover
    input
      width: 50%
      height: 50%
      opacity: 0
    .tip
      height: 1.2rem
      text-align: center
      font-size: 1.2rem
      line-height: 1.2rem
      color: gray
</style>
