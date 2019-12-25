<template>
  <div class="editWrapper">
    <previewAnSave @submit="submit" @preview="preview"></previewAnSave>
    <div class="inlineBlock">
      <div class="top">
        <div class="editTop">
          <uploadFile :src="form.file.filename" :isVideo="true" :radio="radio" @getFileName="getFileName"></uploadFile>
          <div class="inputGroup">
            <el-form :model="form" :rules="rules" ref="form">
              <el-form-item prop="name">
                <el-input
                  type="text"
                  maxlength="30"
                  show-word-limit
                  placeholder="课程名称"
                  v-model="form.name"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="price">
                <el-input placeholder="课程价格" v-model="form.price" clearable></el-input>
              </el-form-item>
              <el-form-item prop="duration">
                <el-input placeholder="课程时长" v-model="form.duration" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.category" placeholder="课程分类">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-radio-group v-model="form.degree">
                <el-radio label="入门">入门</el-radio>
                <el-radio label="中级">中级</el-radio>
                <el-radio label="高级">高级</el-radio>
              </el-radio-group>
            </el-form>
          </div>
        </div>
        <div class="editInfo">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            maxlength="200"
            show-word-limit
            placeholder="课程简介"
            v-model="form.info"
          ></el-input>
        </div>
      </div>
      <richEditor :content.sync="form.content" :contentCopy="form.content" class="rich"></richEditor>
    </div>
  </div>
</template>

<script>
import richEditor from '../richEditor/richEditor'
import uploadFile from '../uploadFile/uploadFile'
import previewAnSave from '../previewAnSaveBtn/previewAnSaveBtn'
import { mapGetters } from 'vuex'
import { storeLocalData, getLocalData } from '../../common/js/base' // 不需要加this
// import Qs from 'qs'

export default {
  name: 'lesoninit',
  props: {
    radio: {
      type: String,
      default: '0.7'
    }
  },
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入课程价格', trigger: 'blur' }],
        duration: [
          { required: true, message: '请输入课程时长', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: 'CET4',
          label: 'CET4'
        },
        {
          value: 'CET6',
          label: 'CET6'
        },
        {
          value: '雅思',
          label: '雅思'
        },
        {
          value: '单项练习',
          label: '单项练习'
        },
        {
          value: '新闻动态',
          label: '新闻动态'
        },
        {
          value: '电影音乐',
          label: '电影音乐'
        },
        {
          value: '旅游美食',
          label: '旅游美食'
        },
        {
          value: '民族风俗',
          label: '民族风俗'
        }
      ],
      value: '',
      /*
    name: { type: String, required: true },
    // price: { type: String, required: true, unique: true },
    price: String,
    duration: String,
    degree: { type: Number, required: true },
    content: String,
    info: String,
    category: { type: String, required: true },
    file: {
      filename: String,
      id: String
    },
    teacherId: { type: String, required: true },
    lessonId: { type: String, required: true },
       */
      form: {
        name: '',
        price: '',
        duration: '',
        degree: '',
        category: '',
        content: '',
        info: '',
        teacherId: '',
        file: {},
        uploadTime: '',
        lessonId: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUserData', 'getScreenWidth'])
  },
  created () {
    console.log(this.form.content, 'content')
    this.form.teacherId = this.getUserData._id
    if (getLocalData(['lessonInfo'])[0]) { // 如果本地储存了lessonInfo，则表示是从预览页面返回的，否则，保存时候会将此数据清楚
      this.form = getLocalData(['lessonInfo'])[0]
      if (this.$route.query._id) {
        this.modify = true
        this._id = this.$route.query._id
      }
    } else {
      if (this.$route.query._id) {
      // 如果传进了_id，便是修改，能进编辑页面的只能是管理者新建lesson或者修改lesson
        this._id = this.$route.query._id
        this.modify = true
        let that = this
        this.$axios({
        /* 这里顺便要加上用户的id */
          method: 'get',
          url: '/api/getTheLessons',
          params: {
            collectName: 'lessonInfos',
            _id: this._id
          }
        })
          .then(res => {
            if (res.status === 200) {
            /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
              let data = res.data
              this.form = data[0]
              console.log(data, 'getData success')
            } else {
              that.$message({
                message: '获取失败！，请重试！',
                duration: '2000',
                type: 'error'
              })
            }
          })
          .catch(err => {
            that.$message({
              message: `获取失败！，出现错误！'${err}`,
              duration: '2000',
              type: 'error'
            })
          })
      }
    }
  },

  methods: {
    getFileName (data) {
      this.form.file = data
    },
    preview () {
      let date = new Date()
      this.form.uploadTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      console.log(this.form, 'form')
      storeLocalData([['lessonInfo', this.form]])
      this.$router.push({
        path: '/lessoninfoPreview',
        query: { state: '0', width: this.getScreenWidth }
      }) // state表示进入页面的状态0：编辑-》预览 1： 查看-》预览
    },
    submit () {
      let that = this
      /* { collectName：xxx, data:xxx } */
      let date = new Date()
      this.form.uploadTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      let data, url
      if (this.modify) { // 查找、修改数据
        data = {
          collectName: 'lessonInfos',
          condition: { _id: this._id },
          updata: this.form
        }
        url = '/api/updateTheLesson'
        console.log(this.modify, 'modify')
      } else { // 新建，插入数据
        data = [
          {
          // 数据要严格按照model中的Schema格式来弄，否则会插入失败
            collectName: 'lessonInfos', // model实例，数据库那边默认复数且小写形式
            data: [this.form]
          }
        ]
        url = '/api/saveColletion'
      }
      this.$axios({
        // 这里顺便要加上用户的id
        method: 'post',
        url: url,
        data: data
      })
        .then(res => {
          if (res.status === 200) {
            // 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          // 然后点击后进去具体lesson编辑页面
            let data = res.data
            console.log(data, 'update success')
            that.$message({
              message: '保存成功！',
              duration: '2000',
              type: 'success'
            })
            storeLocalData([['lessonInfo', '']])
            this.$router.push('/management')
          } else {
            that.$message({
              message: '保存失败！，请重试！',
              duration: '2000',
              type: 'error'
            })
          }
        })
        .catch(err => {
          that.$message({
            message: `保存失败！，出现错误！'${err}`,
            duration: '2000',
            type: 'error'
          })
        })
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
*
  transition: all .5s
.editWrapper,.top
  margin: 0 auto
  width: 100%
  .previewAnSave
    width: 7%
    display: inline-block
    vertical-align: top
    margin-right: 10%
  .inlineBlock
    display: inline-block
    width: 66%
    .rich
      margin: 40px 0
    .top
      width: 100%
      margin: 0 auto
      min-height: 6.25rem
      padding: 10px
      box-shadow: 0 0 1rem lightgray
      .editTop
        display: flex
        flex-direction: row
        width:100%
        min-height: 4.375rem
        align-self: center
        justify-content: center
        .imgWrapper:hover
          cursor: pointer
        .imgWrapper
          display: flex
          justify-content: center
          width: 43%
          height: 13.375rem
          background: #e8e8e8
          border: 1px dotted gray
          margin: 0rem 1.25rem .625rem 1.25rem
          .tip
            align-self: center
            color: gray
          img
            box-shadow: 0 0 1rem lightgray
        .inputGroup
          width: 47%
          display: flex
          flex-direction: column
          justify-content: space-around
          margin: .625rem 1.25rem
        .el-radio-group
          margin: 0 auto
      .editInfo
        padding: 10px 0 0 0

</style>
