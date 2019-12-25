<template>
  <div id="card-English">
    <div class="middleCard">
    <el-row>
      <!-- 右边的1是调整大小的 -->
  <el-col :span="4" v-for="(o, index) in 1" :key="o.id" :offset="index > 0 ? 1 : 0" style="margin-right: 5%;">
    <el-card :body-style="{ padding: '0px' }" >
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>英语四级</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button @click="cardClick" type="text" class="button">详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
  <el-col :span="4" v-for="(o, index) in 1" :key="o.id" :offset="index > 0 ? 1 : 0" style="margin-right: 5%;">
    <el-card :body-style="{ padding: '0px' }"  >
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>英语六级</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button @click="cardClick" type="text" class="button">详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

  <el-col :span="4" v-for="(o, index) in 1" :key="o.id" :offset="index > 0 ? 1 : 0" style="margin-right: 5%;">
    <el-card :body-style="{ padding: '0px' }"  >
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>雅思</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button @click="cardClick" type="text" class="button">详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

  <el-col :span="4" v-for="(o, index) in 1" :key="o.id" :offset="index > 0 ? 1 : 0" style="margin-right: 5%;">
    <el-card :body-style="{ padding: '0px' }" >
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>单项训练</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button @click="cardClick" type="text" class="button">详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

</el-row>

</div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardEnglish',
  data () {
    return {
      currentDate: '2019-2-23'
    }
  },
  mounted: function () {
  },
  computed: {
    ...mapGetters([
      'getScreenWidth'
    ])
  },
  methods: {
    cardClick () {
      this.$router.push({ path: '/lessoninfoPreview',
        query: {
          width: this.getScreenWidth
        } })
    }
  }
}
</script>

<style  lang="scss">
 //卡片
     .middleCard {
    margin-left: 15%;
    margin-top: 3%;
  }
    .time {
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
    width: 100%;
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
