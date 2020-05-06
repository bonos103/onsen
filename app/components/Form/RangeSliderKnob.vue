<template lang="pug">
  div(:class="$style.knob")
</template>
<style lang="postcss" module>
  .knob {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--salmon);
    box-shadow: 0 0 4px color(var(--black) a(10%));
    transform: translate(-50%, -50%);
    cursor: ew-resize;
    transition: left 0.1s;
  }
</style>
