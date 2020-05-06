<template lang="pug">
  label(:class="$style.label")
    select(
      :id="id",
      :value="value",
      @change="handleChange",
      :class="$style.control",
    )
      slot
</template>
<script>
export default {
  props: {
    value: { type: [String, Number, Object, Array], default: '' },
    id: {
      type: String,
      default() {
        return `select-${new Date().getTime()}`
      },
    },
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.$emit('change', value)
    },
  },
}
</script>
<style lang="postcss" module>
  .label {
    position: relative;
    font-size: 1.4rem;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 1em;
      width: 0.7em;
      height: 0.7em;
      border-bottom: 1px solid var(--salmon);
      border-right: 1px solid var(--salmon);
      transform: translateY(20%) rotate(45deg) skew(4deg, 4deg);
      z-index: 1;
      pointer-events: none;
    }
  }
  .control {
    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    font-size: 1.4rem;
    color: var(--salmon);
    line-height: 24px;
    vertical-align: top;
    height: 2.5em;
    width: 100%;
    max-width: 100%;
    background-color: var(--white);
    border: 1px solid var(--salmon-light);
    border-radius: 1.25em;
    padding-left: 1.25em;
    padding-right: 2.2em;
  }
</style>
