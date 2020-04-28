<template lang="pug">
  transition(
    :enterClass = "$style.enter",
    :enterActiveClass = "$style.enterActive",
    :leaveActiveClass = "$style.leaveActive",
    :leaveToClass = "$style.leaveTo",
    appear,
    mode = "",
  )
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

  .enter,
  .leaveTo {
    transform: scale(0);
  }
  .enterActive,
  .leaveActive {
    transition: transform 0.3s ease-in-out;
    transform-origin: calc(100% - 20px) 30px;
  }
  .leaveActive {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
