<template>
<div id="LearnManag-Card" >
  <!-- <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
  </ul> -->

  <div class="demo-image__lazyincard" style="margin-left: 5%;">
    <el-container  class="demo-image__lazyincard">
  <el-aside width="260px">
    <el-image :src="urls[1]" lazy class="imgcardincard" ></el-image>
  </el-aside>
  <el-main>
         <!-- style="float: left;width:78%;" -->
       <div class="text-leftalignBig" >
         课堂名称
        </div>
        <!-- <div class="text-leftalignSmall" style="float: left;text-align: left;width:22%;">
         课堂名称
        </div> -->
        <div class="text-leftalign">
        简介
        </div>
        <div class="text-rightalign">
        XX/XX课时
        </div>
      <el-progress :text-inside="true" :stroke-width="24" :percentage="50" status="exception"></el-progress>

  </el-main>
</el-container>
    <!-- <div class="elementcard"> -->
    <!-- </div> -->
  </div>
</div>

</template>

<script>
export default {
  name: 'LearnManagCard',
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
.demo-image__lazyincard{
  border-radius: 30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 1%;
  width: 1000px;
}
.imgcardincard{
  width: 200px;
  height: 200px;
  border-radius: 30px;
  margin-top: 6%;
  margin-right: 5%;

  margin-bottom: 5%;
}
.text-leftalignBig{
  text-align: left;
  font-size: 32px;
  margin-bottom: 1%;
}
.text-leftalignSmall{
  text-align: left;
  font-size: 18px;
  margin-top: 1%;
  margin-bottom: 1%;
}
.text-leftalign{
  text-align: left;
  margin-left: 0.5%;
  font-size: 24px;
  margin-bottom: 5%;
}
.text-rightalign{
  text-align: right;
  margin-bottom: 2%;
  margin-right: 2%;
  font-size: 28px;
}

</style>
