<template lang="pug">
  div
    div(v-for="item in items", :key="item.NAME")
      div {{item.NAME}}
      div {{item.URL}}
      div {{item.ADDRESS}}
      div {{item.PRICE}}
      div {{item.type}}
</template>
<script>
import csv from '@/assets/data/hokkaido.csv'

export default {
  layout: 'map',
  data() {
    return {
      items: csv,
    }
  },
}
</script>
