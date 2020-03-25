<template lang="pug">
  div
    google-map(:items="items")
    div(v-for="item in items", :key="item.NAME")
      div {{item.NAME}}
      div {{item.URL}}
      div {{item.ADDRESS}}
      div {{item.PRICE}}
      div {{item.type}}
</template>
<script>
import csv from '@/assets/data/hokkaido.csv'
import GoogleMap from '@/components/map/googleMap'

export default {
  layout: 'map',
  components: {
    GoogleMap,
  },
  data() {
    return {
      items: csv,
    }
  },
}
</script>
