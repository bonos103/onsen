<template lang="pug">
  img(:class="$style.logo", src="@/assets/images/logo.svg?inline", alt="FUROMAP")
</template>
<style lang="postcss" module>
.logo {
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
