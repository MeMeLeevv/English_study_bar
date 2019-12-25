<template>
<div id="NavUsersandAdmi" @click="itemClick">
    <slot name="item-test-users"></slot>
    <slot name="item-administrator"></slot>
  </div>
</template>

<script>
export default {
  name: 'NavUsersandAdmi',
  methods: {
    itemClick () {
      /* this.$router.push(this.path)
      console.log(this.path) */
    }
  }
}
</script>

<style lang="scss">
.nav{
  margin-top: 50px;
  height: 50px;
}
.box{
  width: 400px;
  height: 400px;
  margin-top: 10%;
  margin-left: 40%;

  border-radius: 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: white;
  color:  white;
}

</style>
