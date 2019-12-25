<template>
  <form action="/upload" method="POST" enctype="multipart/form-data">
    <!-- <div>
      <input type="text" v-model="lessonTitle" name="lessonTitle" id="lessonTitle" placeholder="请输入课程题目"/>
    </div>
    <div>
      <textarea name="lessonInfo" rows="5" cols="50" id="lessonInfo" v-model="lessonInfo" placeholder="请输入课程介绍"></textarea>
    </div>
    <div>
      <label for="lessonType">课程类型:</label>
      <select name="lessonType" id="lessonType" v-model="lessonType">
        <option>收费</option>
        <option>免费</option>
      </select>
    </div>
    <div v-if="hasPrice">
      <input name="lessonPrice" v-model="lessonPrice" type="text" id="lessonPrice" placeholder="请输入课程价格"/>
    </div>
    <div>
      <label for="lessonCover">请选择课程封面:</label>
      <br />
      <input type="file" @change="getLessonCover" name="lessonCover" id="lessonCover"/>
      <img v-if="lessonCover" :src="lessonCover" style="width:100px;height:100px;display:inline-block;"  />
    </div> -->
    <div>
      <label for="lessonVideo">请选择课程视频:</label>
      <br />
      <input type="file" @change="getLessonVideo" name="lessonVideo" id="lessonVideo"/>
    </div>
    <div>
      <input type="submit" value="Submit"/>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      lessonTitle: '',
      lessonInfo: '',
      lessonType: '',
      lessonCover: '',
      lessonPrice: '',
      lessonVideo: '',
      imgData: {},
      videoData: {}
    }
  },
  computed: {
    hasPrice () {
      return this.lessonType === '收费'
    }
  },
  watch: {
    lessonCover (src) {
      this.lessonCover = src
    }
  },
  methods: {
    getLessonCover (e) { // 将图片地址获取下来//判断格式
    /*
    选中文件通过 HTMLInputElement.files 属性返回 — 返回值是一个 FileList 对象,这个对象是一个包含了许多 File 文件的列表(你也可以像列表一样操作它).
    每个 File 对象包含了下列信息:

    name: 文件名.
    lastModified: UNIX timestamp 形式的最后修改时间.
    lastModifiedDate:  Date 形式的最后修改时间.
    size: 文件的字节大小.
    type: DOMString 文件的 MIME 类型.
     */
      let img = document.querySelector('#lessonCover').files[0]
      let imgSrc = this.getObjectURL(img) // 获取临时路径然后预览
      this.lessonCover = imgSrc
      this.imgData = img
      console.log(imgSrc, 'imgSrc')
    },
    getObjectURL (file) { // 一次性函数，覆盖原来的函数就不用每次运行都判断
      var getObjectURL = null
      if (window.createObjectURL !== undefined) {
        /*
        objectURL = URL.createObjectURL(object) 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。
        object —— 用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象
        */
        getObjectURL = window.createObjectURL
      } else if (window.URL !== undefined) {
        getObjectURL = window.URL.createObjectURL
      } else if (window.webkitURL !== undefined) {
        getObjectURL = window.webkitURL.createObjectURL
      } else {
        throw new Error('浏览器不支持')
      }
      this.getObjectURL = getObjectURL
      return getObjectURL(file)
    },
    getLessonVideo (e) { //  判断格式以及大小
      let video = document.querySelector('#lessonVideo').files[0]
      this.videoData = video
    }
    /* submitForm () {
      var formData = new FormData()
      // formData.append('video', this.videoData)
      formData.append('img', this.imgData)
      formData.append('lessonTitle', this.lessonTitle)
      formData.append('lessonInfo', this.lessonInfo)
      formData.append('lessonType', this.lessonType)
      formData.append('lessonPrice', this.lessonPrice)

      var options = {
        url: 'assets/lesson',
        data: formData,
        methods: 'post',
        contentType: false,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      axios(options).then((res) => {
        console.log('插入成功')
      }).catch(err => {
        console.log(err, '插入失败')
      })
    } */
  }
}

</script>

<style lang="scss">

</style>
