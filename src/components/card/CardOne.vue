<template>
 <div id="Card-one">
   <el-col :span="4" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 0" style="margin-right: 5%;">
    <el-card :body-style="{ padding: '0px' }" >
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>英语课程1</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">详情</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
 </div>
</template>

<script>

export default {
  name: 'CardOne',
  components: {

  }
}
</script>

<style lang="scss">
 // 卡片
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
</style>
