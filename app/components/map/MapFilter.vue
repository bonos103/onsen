<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.icon", @click.prevent.stop="handleToggle")
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
import { mapActions, mapState } from 'vuex'
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
  },
  methods: {
    ...mapActions('onsen', {
      setFilters: 'setFilters',
    }),
    handleToggle() {
      this.visibleBox = !this.visibleBox
    },
    handleClose() {
      this.visibleBox = false
    },
    handleChangePref(pref) {
      // this.setFilters({ pref })
      const query = { ...this.$route.query }
      const params = { ...this.$route.params, pref }
      const name = params.pref ? 'map-pref' : 'map'
      this.$router.push({ name, params, query })
    },
    handleChangeRange(range) {
      // this.setFilters({ priceRange: range })
      const query = { ...this.$route.query, range }
      const params = { ...this.$route.params }
      const name = params.pref ? 'map-pref' : 'map'
      this.$router.push({ name, params, query })
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
    & svg {
      fill: var(--salmon);
      width: 25px;
    }
  }
</style>
