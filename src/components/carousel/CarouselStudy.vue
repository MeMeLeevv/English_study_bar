<template>
  <div id="carousel-study">
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">
          <!-- {{ item }} -->
          <!-- <img class="imgwidth" src="../../assets/img/tabbar/ICON.png" alt=""> -->
          </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'CarouselStudy'
}
</script>

<style  lang="scss">
// 轮播框
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    // line-height: 150px;
    margin: 0;

  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
     background-image:url(../../assets/img/tabbar/bg_001.png);

  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
     background-image:url(../../assets/img/tabbar/bg_001.png);
  }
</style>
