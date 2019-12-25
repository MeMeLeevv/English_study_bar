<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color : rgb(43, 43, 43);
/* 如果要移动端开发的话
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px 10px 1px rbga(100,100,100,0.3); */
  }
</style>
