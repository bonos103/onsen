<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.icon")
      filter-icon
    filter-box
</template>
<script>
import FilterIcon from '@/assets/images/commons/filter.svg'
import FilterBox from '@/components/map/FilterBox'

export default {
  components: {
    FilterIcon,
    FilterBox,
  },
}
</script>
<style lang="postcss" module>
  .wrap {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 100%;
    max-width: 320px;
  }
  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
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
