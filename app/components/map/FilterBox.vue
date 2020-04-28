<template lang="pug">
  div(:class="$style.box")
</template>
<script>
export default {
  mounted() {
    this.$listen(window, 'click', this.handleClose)
    this.$listen(window, 'touchmove', this.handleClose)
    this.$listen(window, 'mouseup', this.handleMouse)
    this.$listen(window, 'mousedown', this.handleMouse)
    this.$listen(window, 'mousemove', this.handleClose)
  },
  methods: {
    handleClose(e) {
      e.preventDefault()
      if (e.type === 'mousemove' && !this.isMouseDown) {
        return
      }
      console.log('active!')
      if (!e.target.contains(this.$el)) {
        this.$emit('close')
      }
    },
    handleMouse(e) {
      this.isMouseDown = e.type === 'mousedown'
    },
  },
}
</script>
<style lang="postcss" module>
  .box {
    width: 100%;
    max-width: 320px;
    background-color: var(--salmon-lighter);
    border-radius: 10px;
    box-shadow: 0 3px 6px color(var(--black) a(10%));
    padding: 60px 20px 20px;
  }
</style>
