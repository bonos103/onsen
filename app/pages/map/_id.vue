<template lang="pug">
  div
</template>
<script>
export default {
  asyncData({ params, store }) {
    return {
      item: store.getters['onsen/getById'](params.id),
    }
  },
}
</script>
