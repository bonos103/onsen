<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.icon")
      filter-icon
</template>
<script>
import FilterIcon from '@/assets/images/commons/filter.svg'

export default {
  components: {
    FilterIcon,
  },
}
</script>
<style lang="postcss" module>
  .wrap {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    background-color: var(--white);
    border: 2px solid var(--salmon);
    border-radius: 50%;
    & svg {
      fill: var(--salmon);
      width: 25px;
    }
  }
</style>
