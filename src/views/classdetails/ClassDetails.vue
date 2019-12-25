<template>
 <div class="bg">
  <div id="Class-Details" style="margin-left: 25%;">
    <el-container  class="demo-image__lazy" style="color:whtie">
      <el-aside width="450px">
        <el-image :src="urls[1]" lazy class="imgcardtop" ></el-image>
      </el-aside>
      <el-main>
         <!-- style="float: left;width:78%;" -->
       <div class="text-leftalignBig" >
         课程名称【数据】
        </div>
        <!-- <div class="text-leftalignSmall" style="float: left;text-align: left;width:22%;">
         课堂名称
        </div> -->
        <div class="text-leftalign">
        价格：【数据】
        </div>
        <div class="text-leftalign">
        学习有效期：【数据】
        </div>
        <div class="text-leftalignSmall">
        简介【数据】
        </div>
        <div class="text-rightalign">
        <button class="butlog">加入课程</button>
        </div>
      <!-- <el-progress :text-inside="true" :stroke-width="24" :percentage="50" status="exception"></el-progress> -->
      </el-main>
    </el-container>
  </div>

<div>

<div id="sthw" style="margin-left: 25%;margin-top:30px;float:left;display: block;">
<el-container class="demo-image__lazyleft" style="color:whtie">
  <el-header>
    <div class="text-leftalignBig" >
         课程名称【数据】
    </div>
    </el-header>
  <el-container>
    <el-aside width="350px"><el-image :src="urls[1]" lazy class="imgcardleft" ></el-image></el-aside>
    <el-main>
      <div class="text-leftalignSmall">
      简介【数据】
      </div>
    </el-main>
  </el-container>
  <el-footer height="200px">
    <div class="text-leftalignSmall" >
        简介【数据】
        </div></el-footer>
</el-container>
</div>

 <div style="float:left;display: block;">

  <div id="rightteacher" style="margin-left: 25%;margin-top:30px;">
<el-container class="demo-image__lazyteacherleft" style="color:whtie">
  <el-header>
    <div class="text-leftalignTeacher" >
         授课教师【数据】
    </div>
    </el-header>
  <el-container>
    <el-aside width="150px"><el-image :src="urls[1]" lazy class="imgcardteacher" ></el-image></el-aside>
    <el-main>
      <div class="text-leftalignSmall">
      简介【数据】
      </div>
      <div class="text-leftalignSmall" style="margin-top:10%">
      简介【数据】XXXXX
      </div>
    </el-main>
  </el-container>
</el-container>
</div>

<div id="classindex" style="margin-left: 25%;margin-top:30px">
<el-container class="demo-image__lazyteacherleft" style="color:whtie">
  <el-header>
    <div class="text-leftalignTeacher" >
        课程目录
    </div>
    </el-header>
  <el-container>
    <el-main height="200px">
      <div class="text-rightalignSmall">
      简介01-XXXXXXXXX【数据】
      </div>
      <div class="text-rightalignSmall" style="margin-top:10%">
      简介02-XXXXXXXXX【数据】
      </div>
       <div class="text-rightalignSmall" style="margin-top:10%">
      简介03-XXXXXXXXX【数据】
      </div>
         <div class="text-rightalignSmall" style="margin-top:10%">
      简介04-XXXXXXXXX【数据】
      </div>
    </el-main>
  </el-container>
</el-container>
</div>
 </div>

  </div>
  </div>

</template>

<script>
export default {
  name: 'ClassDetails',
  data () {
    return {
      count: 0,
      urls: [
        '../../assets/img/bg/class.png',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  }
}
</script>

<style lang="scss">
.bg{
  min-height: 100vh;
  background-color: rgb(230, 230, 230);
}
.kuang{
  margin-top:10%;
  text-align: center;
  width: 600px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 0px;
  box-shadow: 0 2px 12px 0 rgba(95, 95, 95, 0.1);
}
.picture{
  margin: 20px,20px,20px,20px;
  width:800px;
  height:400px;
}
//
.el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
 .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: white;
    color: #333;
    text-align: center;
  }
//
.demo-image__lazy{
  // border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 3%;
  width: 1000px;
}
.demo-image__lazyleft{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 620px;
}
.demo-image__lazyteacherleft{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 300px;
}
.imgcard{
  width: 800px;
  height: 200px;
  margin-top: 6%;
  margin-left: 6%;
  margin-bottom: 5%;
}
.imgcardtop{
  width: 420px;
  height: 200px;
  margin-top: 6%;
  margin-left: 6%;
  margin-bottom: 5%;
}
.imgcardleft{
  width: 320px;
  height: 200px;
  margin-top: 6%;
  margin-left: 6%;
  margin-bottom: 5%;
}
.imgcardteacher{
  width: 100px;
  height: 100px;
  margin-top: 6%;
  margin-left: 6%;
  margin-bottom: 5%;
  border-radius: 60px;
}
.text-leftalignBig{
  text-align: left;
  font-size: 32px;
  margin-top:3%;
  margin-bottom: 5%;
  font-weight:bold;
  font-family: "字体中国-锐博体V1"
}
.text-leftalignTeacher{
  text-align: left;
  font-size: 24px;
  font-weight:bold;
  font-family: "字体中国-锐博体V1"
}
.text-leftalign{
  text-align: left;
  font-size: 18px;
  margin-bottom: 1%;
  margin-top: 1%;
  font-weight:bold;
  margin-left: 1%;
  font-family: "字体中国-锐博体V1"
}
.text-leftalignSmall{
   text-align: left;
  font-size: 18px;
  margin-bottom: 1%;
  margin-top: 2%;
   margin-left: 1%;
  font-family: "字体中国-锐博体V1"
}
.text-rightalignSmall{
   text-align: right;
  font-size: 18px;
  margin-bottom: 1%;
  margin-top: 2%;
   margin-left: 1%;
  font-family: "字体中国-锐博体V1"
}
.text-rightalign{
  text-align: right;
  margin-bottom: 2%;
  margin-right: 2%;
  font-size: 28px;
}
.butlog{
  margin-top: 3%;
  background-color:fc884f;
  width: 120px;
  height:50px;
  border: none;
  background: #fc884f;
  color:#ffffff;
  outline: none;
  font-size: 24px;
  font-family: "字体中国-锐博体V1"
}
</style>
