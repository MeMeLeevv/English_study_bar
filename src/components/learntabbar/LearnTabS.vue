<template>
<el-row style="margin:0;padding:0;">
  <el-col :span="8">

  <div id="LearnTabS" class="tab-control">

    <div v-for="(item, index) in titles" :key="item"
        class="tab-control-item" :class="{active : index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
  </el-col>

      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light">
        </div></el-col>
    </el-row>
</template>

<script>

export default {
  name: 'LearnTabS',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    }
  },
  components: {
  }
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
    width: 250px;
    flex:1;
  }
  .tab-control-item span {
    padding: 5px;
  }
.active {
  color: #eb7941;
  border-bottom: 3px solid #eb7941;
}
</style>
