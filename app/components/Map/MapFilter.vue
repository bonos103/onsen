<template lang="pug">
  div(:class="$style.wrap")
    div(
      :class="$style.icon",
      :data-active="isFiltered",
      :data-open="visibleBox",
      @click.prevent.stop="handleToggle",
    )
      filter-icon
    filter-box(
      v-if="visibleBox",
      :prefecture="filters.pref",
      :range="filters.priceRange",
      :steps="steps",
      @close="handleClose",
      @change:pref="handleChangePref",
      @change:range="handleChangeRange",
    )
</template>
<script>
import { mapState } from 'vuex'
import FilterIcon from '@/assets/images/commons/filter.svg'
import FilterBox from '@/components/Map/FilterBox'

export default {
  components: {
    FilterIcon,
    FilterBox,
  },
  data() {
    // const steps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    return {
      // range: [steps[0], steps[steps.length - 1]],
      // steps,
      visibleBox: true,
    }
  },
  computed: {
    ...mapState('onsen', {
      steps: 'steps',
      filters: 'filters',
    }),
    isFiltered() {
      return this.filters.pref ||
            this.filters.priceRange[0] !== this.steps[0] ||
            this.filters.priceRange[1] !== this.steps[this.steps.length - 1]
    },
  },
  mounted() {
    if (window.innerWidth < 768 || this.$route.name === 'map-pref-id') {
      this.visibleBox = false
    }
  },
  methods: {
    handleToggle() {
      this.visibleBox = !this.visibleBox
    },
    handleClose() {
      this.visibleBox = false
    },
    handleChangePref(pref) {
      const query = { ...this.$route.query }
      const params = { ...this.$route.params, pref }
      const name = params.pref ? 'map-pref' : 'map'
      this.$router.push({ name, params, query })
      this.changedClose()
    },
    handleChangeRange(range) {
      const query = { ...this.$route.query, range }
      const params = { ...this.$route.params, pref: this.filters.pref }
      const name = params.pref ? 'map-pref' : 'map'
      this.$router.push({ name, params, query })
      this.changedClose()
    },
    changedClose() {
      setTimeout(() => {
        this.visibleBox = false
      }, 500)
    },
  },
}
</script>
<style lang="postcss" module>
  .wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 360px;
    padding: 20px;
    z-index: 110;
  }
  .icon {
    position: absolute;
    top: 30px;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    background-color: var(--white);
    border: 2px solid var(--salmon);
    border-radius: 50%;
    z-index: 1;
    transition: background-color 0.3s, border-color 0.3s;
    & svg {
      fill: var(--salmon);
      width: 25px;
      transition: fill 0.3s;
    }
    &:not([data-open]) {
      box-shadow: 0 0 6px color(var(--black) a(20%));
    }
    &[data-active] {
      background-color: var(--salmon);
      border-color: var(--white);
      & svg {
        fill: var(--white);
      }
    }
  }
</style>
