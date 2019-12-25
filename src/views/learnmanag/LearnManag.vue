<template>
<div>
  <carousel-study></carousel-study>
  <LearnTabS :titles="['我的学习','购买教程']"
              @tabClick="tabClick"></LearnTabS>

  <el-container style="height:auto">
    <el-aside width="254px" class="leftcolor">
          <Learn-Manag-Aside @clickMenu="clickMenu"></Learn-Manag-Aside>
    </el-aside>
    <el-main>
      <categoryCard :showData="showData" :index="index" :width="getScreenWidth"></categoryCard>
    </el-main>
  </el-container>
</div>
</template>

<script>
import CarouselStudy from '../../components/carousel/CarouselStudy'
import LearnTabS from '../../components/learntabbar/LearnTabS'
// import LearnManagCard from '../../components/learnmanagimg/LearnManagCard'
import LearnManagAside from '../../components/LearnManagAside/LearnManagAside'
import categoryCard from '../../views/categoryCard/categoryCard'
import { mapGetters } from 'vuex'

// import LearnCarditem from '../../components/learnmanagimg/LearnCarditem'
export default {
  name: 'LearnManag',
  data () {
    return {
      showData: [],
      index: '1'
    }
  },
  components: {
    CarouselStudy,
    LearnTabS,
    categoryCard,
    // LearnCarditem,
    // LearnManagCard,
    LearnManagAside
  },
  created () { // getStarArr
  },
  methods: {
    /*
    事件监听
    */
    clickMenu (index) {
      console.log(index, ' index')
    },
    tabClick (index) {
      this.index = index
      console.log(index)
    }
  },
  computed: {
    ...mapGetters(['getUserData', 'getScreenWidth'])
  }
}
</script>

<style lang="scss">
.cardzoom{
  width: 50%;
  height: auto;
}
.el-aside {
    // background-color: #545c63;
    // color: #333;
    text-align: center;
    // line-height: 200px;
  }

.leftcolor {
  background-color: #1f1f1f;
}
</style>
