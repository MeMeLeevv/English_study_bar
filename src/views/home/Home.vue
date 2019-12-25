<template>
 <div>
   <carousel-study></carousel-study>
   <card-English></card-English>
 </div>
</template>

<script>
import CarouselStudy from '../../components/carousel/CarouselStudy'
import CardEnglish from '../../components/card/CardEnglish'

export default {
  name: 'Home',
  created () {
  },
  components: {
    CarouselStudy,
    CardEnglish
  }
}
</script>

<style scoped>

</style>
