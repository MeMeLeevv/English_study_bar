<template>
 <div id="error">
   <div class="showMsg">
     <img src="../assets/img/error.jpg" alt="">
     <h1 class="errorMsg">您暂时无权访问！<a href="/">返回首页</a></h1>
   </div>
 </div>
</template>

<script>

export default {
  name: 'error',
  created () {
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
#error {
  position: relative;
  .showMsg {
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, 20%);
    text-align: center;
    .errorMsg {
      color: black;
    }
  }

}

</style>
