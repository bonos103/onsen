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
    left: 20px;
    top: 15px;
    width: 152px;
    height: auto;
    z-index: 100;
    @media (--md) {
      left: 30px;
      width: 200px;
    }
    & svg {
      height: auto;
      padding: 10px 0;
    }
  }
</style>
