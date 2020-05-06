<template lang="pug">
  div(:class="$style.range")
</template>
<style lang="postcss" module>
  .range {
    position: absolute;
    top: 0;
    height: 4px;
    border-radius: 2px;
    background-color: var(--salmon);
    transition: left 0.1s, right 0.1s;
  }
</style>
