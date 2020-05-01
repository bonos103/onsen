<template lang="pug">
  select(:value="value", @change="handleChange")
    slot
</template>
<script>
export default {
  props: {
    value: { type: [String, Number, Object, Array], default: '' },
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.$emit('change', value)
    },
  },
}
</script>
