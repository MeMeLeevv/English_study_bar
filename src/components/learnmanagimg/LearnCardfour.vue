<template>
<div id="LearnCardfour" >
  <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
  </ul> -->

  <div class="demo-image__lazyincardmanag" style="margin-left: 5%;">
    <el-container  class="demo-image__lazyincardmanag" style="height:200px">
  <el-aside width="200px">
    <el-image :src="urls[1]" lazy class="imgcardincardmanag" ></el-image>
  </el-aside>
  <el-main>
         <!-- style="float: left;width:78%;" -->
       <div class="text-leftalignBigmanag" >
         课堂名称
        </div>
        <!-- <div class="text-leftalignSmall" style="float: left;text-align: left;width:22%;">
         课堂名称
        </div> -->
        <div class="text-leftalignmanag">

          <div class="text-leftalignmanag">
          上传时间：2019.11.15
          </div>

          <div class="text-leftalignmanag" >
          最后更新时间：2019.11.15
          </div>

        </div>

        <div class="text-rightalignmanag">
        <button class="butlogcard">编辑</button>
        </div>

  </el-main>
</el-container>
    <!-- <div class="elementcard"> -->
    <!-- </div> -->
  </div>
</div>

</template>

<script>
export default {
  name: 'LearnCardfour',
  data () {
    return {
      count: 0,
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  methods: {
    load () {
      this.count += 2
    }
  }
}
</script>

<style lang="scss">
//
 .el-aside {
    // background-color: #D3DCE6;
    // color: #333;
    text-align: center;
    // line-height: 200px;
  }

  .el-main {
    // background-color: #E9EEF3;
    // color: #333;
    text-align: center;
    // line-height: 40px;
  }
//
.demo-image__lazyincardmanag{
  border-radius: 30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 1%;
  width: 1000px;
}
.imgcardincardmanag{
  width: 160px;
  height: 160px;
  border-radius: 30px;
  margin-top: 6%;
  margin-right: 5%;
  margin-bottom: 5%;
}
.text-leftalignBigmanag{
  text-align: left;
  font-size: 32px;
  margin-bottom: 1%;
  font-family: "字体中国-锐博体V1";
}
.text-leftalignSmallmanag{
  text-align: left;
  font-size: 18px;
  margin-top: 1%;
  margin-bottom: 1%;
  font-family: "字体中国-锐博体V1";
}
.text-leftalignmanag{
  text-align: left;
  margin-left: 0.5%;
  font-size: 24px;
  margin-bottom: 1%;
  font-family: "字体中国-锐博体V1";
}
.text-rightalignmanag{
  text-align: right;
  margin-bottom: 2%;
  font-size: 28px;
  font-family: "字体中国-锐博体V1";
}
.butlogcard{
  margin-left: 70%;
  background-color:fc884f;
  display: block;
  width: 200px;
  height:40px;
  border: none;
  background: #fc884f;
  color:#ffffff;
  outline: none;
  font-size: 20px;
  font-family: "字体中国-锐博体V1";
}
</style>
