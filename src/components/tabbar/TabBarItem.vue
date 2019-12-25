<template>
      <div class="tab-bar-item" @click="itemClick">
        <div :style="activeStyle"><slot name="item-text"></slot></div>
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-activate"></slot></div>
        <!-- <img src="../../assets/img/tabbar/Study.png" alt=""> -->
        <!-- <div>首页1 </div> -->
      </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    margin-top:2%;
    height:49px;
  }

</style>
