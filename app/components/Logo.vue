<template lang="pug">
  logo-svg(:class="$style.logo")
</template>
<script>
import LogoSvg from '@/assets/images/logo.svg'

export default {
  components: {
    LogoSvg,
  },
}
</script>
<style lang="postcss" module>
.logo {
  fill: var(--salmon);
  max-width: 100%;
  margin: auto;
  animation: appear 1s;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
