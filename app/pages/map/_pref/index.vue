<template lang="pug">
  div
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('onsen', {
      getPrefecture: 'getPrefecture',
      list: 'filteredList',
    }),
    prefecture() {
      return this.getPrefecture() || {}
    },
    description() {
      const listNames = (this.list || []).map(l => l.name).join(', ').slice(0, 100)
      return `地図から${this.prefecture.name}の温泉・銭湯を探せます。${listNames}${listNames.length > 0 ? '...' : ''}`
    },
  },
  head() {
    const title = `${this.prefecture.name}の温泉・銭湯マップ`
    const description = this.description
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'description', name: 'description', content: description },
      ],
    }
  },
}
</script>
