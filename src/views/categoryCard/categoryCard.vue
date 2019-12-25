<template>
  <div id="categoryCard" >
      <!-- 右边的1是调整大小的 -->
  <div  v-for="(o) in data" :key="o._id"  style="display: inline-block;width: 220px;margin:10px;margin: 30px">
    <el-card :body-style="{ padding: '0px' }" >
      <img :src="`/api/images/${o.file.filename}`" class="image">
      <div style="padding: 14px;">
        <span>{{o.name}}</span>
        <div class="bottom clearfix">
          <span class="time">{{o.info}}</span>
          <el-button @click="cardClick(o._id)" type="text" class="button">详情</el-button>
        </div>
      </div>
    </el-card>
  </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'categoryCard',
  data () {
    return {
      data: []
    }
  },
  props: {
    index: {
      type: String,
      default: '0'
    },
    showData: {
      type: Array,
      default: function (params) {
        return []
      }
    }
  },
  computed: {
    ...mapGetters([
      'getScreenWidth',
      'getUserData'
    ])
  },
  created () {
    if (this.$route.query.category) {
      this.width = this.$route.query.width
      this.category = this.$route.query.category
      let that = this
      this.$axios({
      /* 这里顺便要加上用户的id */
        method: 'get',
        url: '/api/getTheLessons',
        params: {
          collectName: 'lessonInfos',
          category: this.category
        }
      })
        .then(res => {
          if (res.status === 200) {
          /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
            let data = res.data
            this.data = data.reverse()
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
    } else {
      if (this.index === '1') {
        let that = this
        this.$axios({
          /* 这里顺便要加上用户的id */
          method: 'get',
          url: '/api/getStarArr',
          params: {
            collectName: 'lessonInfos',
            _idArr: this.getUserData.star
          }
        })
          .then(res => {
            if (res.status === 200) {
              /* 返回对应collection的id后切换到个人编辑过的lesson列表，那里展示所有该用户所编辑过的lesson，用用户id去找，
          然后点击后进去具体lesson编辑页面 */
              let data = res.data
              this.data = data.reverse()
              console.log(data, 'getstarData success')
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
    cardClick (id) {
      this.$router.push({ path: '/lessoninfoPreview',
        query: {
          width: this.getScreenWidth,
          id: id,
          state: '1' // 浏览状态
        } })
    }
  }
}
</script>

<style  lang="scss">

    .time {
    display: inline-block;
    width:150px;
    height: 13px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 220px;
    height: 220px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .box-card{
    border-radius: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  // 列表
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
