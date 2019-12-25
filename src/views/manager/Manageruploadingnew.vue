<template>
<div class="bg">
  <el-container style="height:2000px">
  <el-aside width="180px" height="2000px" class="leftcolor">
    <el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#1f1f1f"
      text-color="#fff"
      active-text-color="#eb7941">
     <el-menu-item index="1" >
        <i class="el-icon-menu"></i>
        <span slot="title">预览</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">保存</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-aside>
  <el-main >
      <div class="demo-image__lazynew" >
        <el-container>
            <el-container>
            <el-aside width="400px">
              <div class="colorforthat">
                添加课题头图
              </div>
            </el-aside>
        <el-main>
          <div class="colorforthatright">
                课程名称
              </div>
              <div class="colorforthatright">
                课程价格
              </div>
              <div class="colorforthatright">
                课程时限
              </div>
        </el-main>
        </el-container>
        <el-footer>
          <div class="colorforthatright">
                课程时限
              </div>
        </el-footer>
        </el-container>
      </div>

      <div class="demo-image__lazynew" >

      </div>
      <!-- <LearnCarditem :goods="goods['pop'].list"/> -->
    </el-main>
  </el-container>
</div>
</template>
<script>

export default {
  name: 'Manageruploadingnew'
}
</script>

<style lang="scss">
// 搜索框的css
  .tab-control {
    display: flex;
    text-align: center;
    font-family: "字体中国-锐博体V1";
    font-size:18px;
    color:white;
    line-height:57px;
    background-color:#1f1f1f;
  }
  .tab-control-item {
    flex:1;
  }
  .tab-control-item span {
    padding: 5px;
  }
.active {
  color: #eb7941;
  border-bottom: 3px solid #eb7941;
}
.colorbac {
  background-color:#1f1f1f;
}
.demo-image__lazynew{
  // border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin-top: 1%;
  margin-left: 10%;
  width: 1000px;
  height:400px;
}
.colorforthat {
  background-color: #a3a3a3;
  margin:5%;
  height:200px;
  width:350px;
  text-align: right;
  font-size: 20px;
  font-family: "字体中国-锐博体V1";
  color: gray;
  text-align:center;
}
.colorforthatright {
  background-color: #a3a3a3;
  margin-bottom:2%;
  height:58px;
  width:400px;
  text-align: right;
  font-size: 20px;
  font-family: "字体中国-锐博体V1";
  color: gray;
  text-align:center;
}
</style>
