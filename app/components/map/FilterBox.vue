<template lang="pug">
  div(:class="$style.box")
</template>
<script>
export default {

}
</script>
<style lang="postcss" module>
  .box {
    width: 100%;
    max-width: 320px;
    background-color: var(--salmon-lighter);
    border-radius: 10px;
    box-shadow: 0 3px 10px color(var(--black) a(16%));
    padding: 60px 20px 20px;
  }
</style>
