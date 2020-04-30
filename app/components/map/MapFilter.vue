<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.icon", @click.prevent.stop="handleToggle")
      filter-icon
    filter-box(
      v-if="visibleBox",
      :range="range",
      :steps="steps",
      @close="handleClose",
      @change:range="handleChangeRange",
    )
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
    const steps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    return {
      range: [steps[0], steps[steps.length - 1]],
      steps,
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
    handleChangeRange(range) {
      this.range = range
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
