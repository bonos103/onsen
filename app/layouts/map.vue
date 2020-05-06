<template lang="pug">
  div
    h1(:class="$style.logo")
      router-link(:to="linkTo")
        logo
    nuxt
</template>
<script>
import Logo from '@/components/Logo'

export default {
  components: {
    Logo,
  },
  computed: {
    linkTo() {
      if (this.$route.name === 'map' && !this.$route.query.range) {
        return { name: 'index' }
      }
      return { name: 'map' }
    },
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
    @media (--md) {
      width: 200px;
    }
  }
</style>
