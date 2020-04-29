<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.icon", @click.prevent.stop="handleToggle")
      filter-icon
    filter-box(v-if="visibleBox", @close="handleClose")
</template>
<script>
import FilterIcon from '@/assets/images/commons/filter.svg'
import FilterBox from '@/components/Map/FilterBox'

export default {
  components: {
    FilterIcon,
    FilterBox,
  },
  data() {
    return {
      visibleBox: true,
    }
  },
  methods: {
    handleToggle() {
      this.visibleBox = !this.visibleBox
    },
    handleClose() {
      this.visibleBox = false
    },
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
    z-index: 1;
    & svg {
      fill: var(--salmon);
      width: 25px;
    }
  }
</style>
