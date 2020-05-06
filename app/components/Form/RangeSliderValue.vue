<template lang="pug">
  div(:class="$style.box")
    div(:class="$style.boxInner") {{value}}
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 100,
    },
  },
}
</script>
<style lang="postcss" module>
  .box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--salmon);
    border-radius: 4px;
    box-shadow: 0 0 4px color(var(--black) a(16%));
    transform: translate(-50%, -100%);
    padding: 6px 6px 5px;
    transition: left 0.1s;
    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      background-color: var(--salmon);
      z-index: 0;
    }
    &::before {
      bottom: -2px;
      left: 50%;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      box-shadow: 0 0 4px color(var(--black) a(16%));
      transform: translateX(-50%) rotate(45deg) skew(10deg, 10deg);
    }
    &::after {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
  .boxInner {
    position: relative;
    font-size: 1.2rem;
    color: var(--white);
    line-height: 1;
    z-index: 1;
  }
</style>
