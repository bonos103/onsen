<template lang="pug">
  div
    div(:style="mapStyle")
      google-map(@click-marker="handleClickMarker")
      //- google-map(@click-marker="handleClickMarker", v-if="visibleMap")
      map-filter
    //- div(:class="$style.list")
      div(v-for="item in items.slice(0, 10)", :key="`${item.pref}${item.id}`")
        div {{item.name}}
        div {{item.url}}
        div {{item.address}}
        div {{item.price}}
        div {{item.type}}
    nuxt-child(:key="$route.fullPath")
</template>
<script>
import _isEqual from 'lodash/isEqual'
import { mapGetters } from 'vuex'
// import { mapActions, mapGetters } from 'vuex'
// import csv from '@/assets/data/hokkaido.csv'
import GoogleMap from '@/components/Map/GoogleMap'
import MapFilter from '@/components/Map/MapFilter'

export default {
  layout: 'map',
  components: {
    GoogleMap,
    MapFilter,
  },
  fetch({ params, query, route, store }) {
    const pref = route.name === 'map-pref-id' ? '' : params.pref || ''
    const range = query.range
    store.dispatch('onsen/setFilters', { pref, priceRange: range })
  },
  data() {
    return {
      windowHeight: 300,
    }
  },
  computed: {
    ...mapGetters('onsen', {
      items: 'filteredList',
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
  beforeRouteUpdate(to, from, next) {
    this.calcWindowHeight()
    const { params, query } = to
    const pref = params.pref || ''
    const range = query.range
    const fromRange = from.query.range
    if (_isEqual(range, fromRange) && (to.name === 'map-pref-id' || from.name === 'map-pref-id')) {
      next()
      return
    }
    this.$store.dispatch('onsen/setFilters', { pref, priceRange: range })
    next()
  },
  methods: {
    handleClickMarker(item) {
      const location = {
        name: 'map-pref-id',
        params: { pref: item.pref, id: item.id },
        query: { ...this.$route.query },
      }
      if (this.$route.name === 'map-pref-id') {
        this.$router.replace(location)
        return
      }
      this.$nuxt.$router.push(location)
    },
    calcWindowHeight() {
      this.windowHeight = window.innerHeight
    },
  },
}
</script>
<style lang="postcss" module>
  .list {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
