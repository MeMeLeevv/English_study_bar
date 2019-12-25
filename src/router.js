import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/home/Home')
const TesthomeCopy = () => import('./views/home/TesthomeCopy')
// const TestEnglish = () => import('./views/testEnglish/TestEnglish')
// const TestEnglishclass = () => import('./views/testEnglish/TestEnglishclass')
const lessoninfoPreview = () => import('./views/lessoninfoPreview/lessoninfoPreview')
const sectioninfoPreview = () => import('./views/sectioninfoPreview/sectioninfoPreview')
const Culture = () => import('./views/culture/Culture')
const LearnManag = () => import('./views/learnmanag/LearnManag')
const Login = () => import('./views/login/Login')
const users = () => import('./views/login/users')
const error = () => import('./views/error')
const Administrator = () => import('./views/login/Administrator')
// const ClassDetails = () => import('./views/classdetails/ClassDetails')
const Manageruploading = () => import('./views/manager/Manageruploading')
const Manageruploadingnew = () => import('./views/manager/Manageruploadingnew')
const lesonInfoEditG = () => import('./views/lesonInfoEditG/lesonInfoEditG')
const lessonDetailEditG = () => import('./views/lessonDetailEditG/lessonDetailEditG')
const categoryCard = () => import('./views/categoryCard/categoryCard')
/* import { Hash } from 'crypto' */

Vue.use(Router)

export default new Router({
/*   mode: Hash, */
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/home',
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/error',
      component: error,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/categoryCard',
      component: categoryCard,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/testEnglish',
      component: TesthomeCopy,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/culture',
      component: Culture,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/learnmanag',
      component: LearnManag,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/loginusers',
      component: users,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/loginAdministrator',
      component: Administrator,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/management',
      component: Manageruploading,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/managementnew',
      component: Manageruploadingnew,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/lessoninfoPreview',
      component: lessoninfoPreview,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/sectioninfoPreview',
      component: sectioninfoPreview,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/lesonInfoEditG',
      component: lesonInfoEditG,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/lessonDetailEditG',
      component: lessonDetailEditG,
      meta: {
        keepAlive: false // 不需要缓存
      }
    }
  ]
})
