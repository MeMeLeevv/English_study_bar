<template>
  <div id="lesson">
    <LessonDetail></LessonDetail>
    </div>
</template>

<script>
export default {
  name: 'lesson',
  data () {
    return {
    }
  },
  created () {
    let data = ''
    this.$axios({
      method: 'get',
      url: '/api/getlesson',
      params: data
    }).then(res => {
      if (res.status === 200) {
        let data = res.data
        console.log(data, 'submit success')
      }
    }).catch(err => {
      console.log(err, 'submit error!')
    })
  },
  computed: {
  },
  components: {
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
</style>
