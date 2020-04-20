<template lang="pug">
  div
    div(:style="mapStyle")
      google-map(@click-marker="handleClickMarker")
    div(v-for="item in items", :key="item.id")
      div {{item.name}}
      div {{item.url}}
      div {{item.address}}
      div {{item.price}}
      div {{item.type}}
    nuxt-child()
</template>
<script>
import { mapState } from 'vuex'
// import csv from '@/assets/data/hokkaido.csv'
import GoogleMap from '@/components/map/googleMap'

export default {
  layout: 'map',
  components: {
    GoogleMap,
  },
  data() {
    return {
      windowHeight: 300,
    }
  },
  computed: {
    ...mapState('onsen', {
      items: 'list',
    }),
    mapStyle() {
      return {
        height: `${this.windowHeight}px`,
      }
    },
  },
  mounted() {
    this.calcWindowHeight()
    this.$listen(window, 'resize', this.calcWindowHeight)
  },
  methods: {
    handleClickMarker(item) {
      this.$router.push({ name: 'map-pref-id', params: { pref: item.pref, id: item.id } })
    },
    calcWindowHeight() {
      this.windowHeight = window.innerHeight
    },
  },
}
</script>
