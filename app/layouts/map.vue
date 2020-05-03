<template lang="pug">
  div
    h1(:class="$style.logo")
      router-link(:to="{ name: 'map' }")
        logo
    nuxt
</template>
<script>
import Logo from '@/components/Logo'

export default {
  components: {
    Logo,
  },
  fetch({ params, store }) {
    const pref = params.pref
    console.log(pref)
    if (pref) {
      store.commit('onsen/setFilter', { pref })
    }
  },
}
</script>
<style lang="postcss" module>
  .logo {
    position: absolute;
    left: 30px;
    top: 15px;
    width: 152px;
    height: auto;
    z-index: 100;
  }
</style>
