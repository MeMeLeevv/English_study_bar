import Vue from 'vue'
import Vuex from 'vuex'
/* const Vue = require('vue')
const Vuex = require('vuex') */

// const cheerio = require('cheerio')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {// 初始化状态设置要全局访问的state对象
    indexMsgReady: false,
    demoNumber: 0,
    screenWidth: 0,
    userData: {},
    lastPath: '' // 登录成功后返回原来的path
  },
  getters: {// 来实时监听state值的变化(最新状态)
    getIndexMsgReady (state) {
      return state.indexMsgReady
    },
    changedDemoNumber (state) {
      return state.demoNumber
    },
    getScreenWidth (state) {
      return state.screenWidth
    },
    getUserData (state) {
      return state.userData
    },
    getLastPath (state) {
      return state.lastPath
    }
  },
  mutations: {// 一个对像可以放改变state初始值的方法，也可以进行改变state里的值
    setScreenWidth (state, width) {
      state.screenWidth = width
    },
    setIndexMsgReady (state) {
      state.indexMsgReady = true
    },
    setUserData (state, value) {
      state.userData = value
    },
    setLastPath (state, value) {
      state.lastPath = value
    }
  },
  actions: {// 这个actions也是个对象变量，最大的作用就是里面的action方法 可以包含任意多个异步操作
    activityTab (context) { // 一个函数连续触发多个mutation的函数
      context.commit('activity')
    },
    getNewNum (context, num) {
      context.commit('newNum', num)
    },
    // 设置state的初值
    initIndexMsg (context, index) {
      context.commit('setActivites', index.activites)
      context.commit('setItems', index.items)
      context.commit('setInspire', index.inspire)
      context.commit('setVideo', index.video)
      context.commit('setBanner', index.banner)
      context.commit('setIndexMsgReady')
      console.log('首页数据初始化成功')
    },
    getIndexMsg (context) {
      let indexMsg = {}
      indexMsg.banner = this.state.banner
      indexMsg.activites = this.state.activites
      indexMsg.items = this.state.items
      indexMsg.inspire = this.state.inspire
      indexMsg.video = this.state.video
      return indexMsg
    }
  }
})
