<template>
    <div id="SearchEnglish" class="grid-content bg-purple-light">
        <el-input placeholder="请输入内容" v-model="input3">
          <el-select v-model="select" slot="prepend" placeholder="请选择" >
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>

</template>

<script>

export default {
  name: 'SearchEnglish',
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: ''
    }
  }
}
</script>

<style lang="scss">
#SearchEnglish {
  display: flex;
  justify-content: center;
}
.el-input {
  align-self: center;
}

</style>
