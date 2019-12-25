<template>
<!-- 此页提示词这边需要优化，当overflow的时候才展示 -->
<div class="memu">
  <div class="header">
    <span>课程目录</span>
    <div class="icon">
      <i @click="deletes" :style="`color: ${canDelete ? 'red' : 'lightgray'}; cursor: ${canDelete ? 'pointer' : 'not-allowed'}`"
      class="iconfont icon-shanchu"></i><i @click="addChapter" class="iconfont icon-jia-"></i>
    </div>
  <transition name="fade">
    <div v-if="showMore" class="addmore">
    <h5 class="addChapter" @click="addChapter">添加章节</h5>
    <h5 class="addSection" @click="addSection">添加小节</h5>
  </div>
  </transition>
  </div>
  <div class="menuList">
    <div class="forBlock" v-for="(chapter, cindex) in menuData" :key="chapter.id" @click.stop="clickItem($event)">
      <div class="chapter" :data-chapter="cindex">
        <span>第{{numToChina(cindex+1)}}章</span>
         <el-tooltip :disabled="!!chapter.chapterTitle ? false : true" class="item" effect="light" :content="chapter.chapterTitle" placement="left">
          <el-input :disabled="state === '0'"  @focus="focus($event)" @blur="blur($event,chapter.chapterTitle,cindex )" size="medium" v-model="chapter.chapterTitle" placeholder="请输入章标题"></el-input>
         </el-tooltip>
        <i @click="addSection" class="iconfont icon-jia-"></i>
      </div>
      <div class="section" v-for="(section, sindex) in chapter.sections" :key="section.id">
        <div class="secLine" :data-chapter="cindex" :data-section="sindex" @click.stop="clickMenu(cindex,sindex)">
          <span>第{{numToChina(sindex+1)}}节</span>
          <el-tooltip :disabled="!!section.secTitle ? false : true" class="item" effect="light" :content="section.secTitle" placement="left">
            <el-input :disabled="state === '0'" @focus="focus($event)" @blur="blur($event, section.secTitle,cindex,sindex)" size="medium"  v-model="section.secTitle" placeholder="请输入节标题"></el-input>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { storeLocalData } from '../../common/js/base' // 不需要加this

export default {
  name: 'memu',
  props: {
    state: {
      type: String,
      default: '0'
    },
    menu: {
      type: Array,
      default: function () {
        return [
          {
            chapterTitle: '',
            disabled: false,
            sections: [{
              secTitle: '',
              disabled: false
            }]
          }
        ]
      }
    }
  },
  data () {
    return {
      chinaNum: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
      lowerDan: ['十', '百', '千'],
      showMore: false,
      canDelete: false,
      selectChapter: false,
      selectSection: false,
      menuData: [
        {
          chapterTitle: '',
          disabled: false,
          sections: [{
            secTitle: '',
            disabled: false
          }]
        }
      ]
    }
  },
  watch: {
    menu: function (newV) {
      this.menuData = newV
      console.log(this.menuData, 'menuNew')
    }
  },
  created () {
    storeLocalData([['cindex', 0]]) // 储存所有数据
    storeLocalData([['sindex', 0]]) // 储存所有数据

    // console.log(this.menuData, 'menuData')
  },
  mounted () {
    // let that = this
    this.$nextTick(function () {
      // 消除input上的border
      document.querySelectorAll('.memu .el-input .el-input__inner').forEach(item => {
        item.style.border = '1px solid white'
      })
    })
  },
  computed: {/* 注意 mounted 不会承诺所有的子组件也都一起被挂载。
  如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted： */
  },
  methods: { // elementUI的input挂载不了data-index = xxx
    clickMenu (cindex, sindex) {
      if (this.cindex !== cindex || this.sinde !== sindex) { // 防止连续点击
        this.cindex = cindex
        this.sindex = sindex
        storeLocalData([['cindex', this.cindex]]) // 储存所有数据
        storeLocalData([['sindex', this.sindex]]) // 储存所有数据

        this.$emit('changeSection', cindex, sindex)
      } else {
      }
    },
    clickItem (e) { // 点击line 删除行 采用时间委托机制
      //  console.log(e.target.parentNode.parentNode.dataset, 'section')
      //  console.log(e.target, 'section')
      // console.log(e.target.nodeName, 'node')
      let target = e.target
      if (target.nodeName.toLowerCase() === 'input') {
        let chapter = target.parentNode.parentNode.dataset.chapter // 先从章开始
        let section = target.parentNode.parentNode.dataset.section // 小节
        this.selectChapter = chapter
        if (section) {
          this.selectSection = section
        }
        this.canDelete = true // 设置此时删除按钮可点击
      } else if (target.nodeName.toLowerCase() === 'i') { // 点击增加小节按钮
        let chapter = target.parentNode.dataset.chapter
        // let section = target.parentNode.dataset.section
        this.selectChapter = chapter
      }
    },
    focus (e) {
      // console.log(e)
      let target = e.target
      target.style.border = '1px solid lightgray'
    },
    blur (e, value, cindex, sindex) { // deep是否在内部
      // console.log(e)
      let target = e.target
      target.style.border = '1px solid white'
      this.canDelete = false
      this.$emit('getMenuData', value, cindex, sindex)
    },
    deletes () {
      this.canDelete = true
      if (this.selectChapter) {
        this.$confirm('你将删除这一章/节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.selectSection !== false) { // 有节
            /* arrayObject.splice(index,howmany,item1,.....,itemX)
            index -- 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置
            howmany -- 必需。要删除的项目数量。如果设置为 0，则不会删除项目
            item1, ..., itemX -- 可选。向数组添加的新项目
            */
            this.menuData[this.selectChapter - 0].sections.splice(this.selectSection - 0, 1)
          } else {
            this.menuData.splice(this.selectChapter - 0, 1)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }).finally(() => {
          this.selectChapter = false
          this.selectSection = false
        })
      }
    },
    showAddMore () {
      this.showMore = !this.showMore
    },
    numToChina (num) { // 100001001010-一千亿零一百万一千零一十,零和一转译会比较麻烦
      num = parseInt(num)
      let numStr = num + ''
      let len = numStr.length - 1
      let that = this
      let result = numStr.split('').reduce((result, next) => {
        next = parseInt(next)
        result += that.chinaNum[next] // 获取数字
        let selectLowerDan = len % 4
        result += selectLowerDan ? that.lowerDan[selectLowerDan - 1] : ''
        result += len === 8 ? '亿' : (len === 4 ? '万' : '') // 加上高级单位
        --len
        return result
      }, '')

      while (result.match(/\u5341\u96f6/)) { // 10会被反译成一十零，所以先剔除这对的零
        result = result.replace(/\u5341\u96f6/g, '十')
      }
      /*
       # 零 一 二 三 四 五 六 七 八 九 十 百  千 万
      reg = '[\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341\u767e\u5343\u4e07]' */
      while (result.match(/(\u96f6[\u5341|\u767e|\u5343])/g)) { // 再剔除掉 零十、零百、零千这些全换成零
        result = result.replace(/(\u96f6[\u5341|\u767e|\u5343])+/g, '零')
      }
      while (result.match(/\u96f6[\u4e07|\u4ebf]/)) { // 接着剔除掉 高位单位零(亿|万),统一只留高级单位
        result = result.replace(/\u96f6([\u4e07|\u4ebf])/g, '$1')
      }
      if (result[result.length - 1] === '零') { // 最后剔除掉末尾的零
        result = result.slice(0, result.length - 1)
      }
      return result
    },
    addChapter () { // 添加章节
      this.$confirm('是否添加章节?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.menuData.push([{
          chapterTitle: '',
          disabled: false,
          sections: []
        }])
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已添加删除'
        })
      }).finally(() => {
        this.selectChapter = false
        this.selectSection = false
      })
    },
    addSection () { // 添加小节
      this.$confirm('是否添加小节?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(this.memuList[this.selectChapter - 0].sections, 'this.memuList[this.selectChapter - 0].sections')
        this.menuData[this.selectChapter - 0].sections.push({ // 初始化section数据
          file: {
            id: '',
            filename: ''
          },
          secTitle: '',
          hasLearned: false,
          content: '',
          disabled: false,
          publicTime: ''
        })
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      }).finally(() => {
        this.selectChapter = false
        this.selectSection = false
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.memu
  display: inline-block
  height: auto
  vertical-align: top
  box-shadow: 0 0 1rem lightgray
  .header
    display: flex
    position: relative
    flex-direction: row
    justify-content: space-between
    padding: .6rem
    .icon-shanchu
      padding: 0 10px
    .fade-enter,.fade-leave-to
      opacity: 0
      transform: translate3d(100%, 0, 0)
    span
      height: 2rem
      line-height: 2rem
      font-size: 1.375rem
      font-weight: bold
    i.iconfont
      position: relative
      font-size: 1.2rem
      line-height: 2rem
      cursor: pointer
    .addmore:hover
      cursor: pointer
    .addmore
      position: absolute
      bottom: -3rem
      right: 10%
      padding: .3125rem 0
      z-index: 1
      background: white
      box-shadow: 0 0 1rem lightgray
      h5
        margin: 0
        padding: .3125rem .625rem
  .menuList
    .forBlock
      padding-bottom: .6rem
      .chapter::before
        content: ''
        display: block
        height: 0
        clear: both
        visibility: none
      .chapter
        height: 3rem
        line-height: 3rem
        padding: 0 .625rem
        clear: both
        font-size: 1.125rem
        box-shadow: 0 0 1rem lightgray
        span
          float: left
          padding-left: .5rem
        .el-input >>> .el-input__inner
          border: 1px solid white
          background: red
        .el-input
          width: 70%
          float: left
          margin: 0 0 0 10px
        i.iconfont
          float: right
      .section
        .secLine
            font-size: 1rem
            padding: .6rem 0 0 0
            position: relative
            display: flex
            flex-direction: row
            span:first-child
              margin: 0 .5rem 0 1.5rem
              line-height: 2rem
            span:last-child
              display: inline-block
              width: 60%
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            i.iconfont
              position: absolute
              right: .625rem
            .el-input
              width: 75%
</style>
