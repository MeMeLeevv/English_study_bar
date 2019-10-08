<template>
  <div class="home">
    <div v-if="isIndexMsgReady">
      <div v-for="item in banner" :key="item.id">{{item}}</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  created () {
  },
  computed: {
    isIndexMsgReady () {
      return this.getIndexMsgReady
    },
    banner () {
      return this.getBanner
    },
    ...mapGetters([
      'getIndexMsgReady',
      'getBanner'
    ])
  },
  components: {
  },
  methods: {
  }
}
</script>
