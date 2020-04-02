<template lang="pug">
  div
    google-map(@click-marker="handleClickMarker")
    div(v-for="item in items", :key="item.NAME")
      div {{item.NAME}}
      div {{item.URL}}
      div {{item.ADDRESS}}
      div {{item.PRICE}}
      div {{item.type}}
    nuxt-child()
</template>
<script>
import { mapState } from 'vuex'
// import csv from '@/assets/data/hokkaido.csv'
import GoogleMap from '@/components/map/googleMap'

export default {
  layout: 'map',
  computed: {
    ...mapState('onsen', {
      items: 'list',
    }),
  },
  components: {
    GoogleMap,
  },
  methods: {
    handleClickMarker(item) {
      const index = this.items.findIndex(i => i === item)
      this.$router.push({ name: 'map-id', params: { id: index } })
    },
  },
  // data() {
  //   return {
  //     items: csv,
  //   }
  // },
}
</script>
