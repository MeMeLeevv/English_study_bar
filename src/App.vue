<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

const bannerUrl = '/indexData'
export default {
  created () {
    this.axiosIndexData()
  },
  methods: {
    axiosIndexData () {
      axios.get(bannerUrl, {// 在客户端发起getBanner的请求
        params: null
      }).then((res) => { // 获取到index的数据
        let data = res.data
        // console.log(data, 'index_data')
        this.initIndexMsg(data) // 初始化store.js文焕=件的首页数据
      })
    },
    ...mapActions([
      'initIndexMsg'
    ])
  }
}
</script>

<style lang="scss">

</style>
