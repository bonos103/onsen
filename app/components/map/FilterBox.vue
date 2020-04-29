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
      div(:class="$style.formItem")
        div(:class="$style.formLabel") 料金
        range-slider(
          :min-value="min",
          :max-value="max",
          :steps="steps",
          @change="changeRange",
        )
      div(:class="$style.formItem")
        div(:class="$style.formLabel") エリア
</template>
<script>
import RangeSlider from '@/components/Form/RangeSlider'

export default {
  components: {
    RangeSlider,
  },
  data() {
    const steps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    return {
      min: steps[0],
      max: steps[steps.length - 1],
      steps,
    }
  },
  mounted() {
    this.$listen(window, 'click', this.handleClose, { passive: false })
    this.$listen(window, 'touchmove', this.handleClose, { passive: false })
    this.$listen(window, 'mouseup', this.handleMouse, { passive: false })
    this.$listen(window, 'mousedown', this.handleMouse, { passive: false })
    this.$listen(window, 'mousemove', this.handleClose, { passive: false })
  },
  methods: {
    handleClose(e) {
      e.preventDefault()
      if (e.type === 'mousemove' && !this.isMouseDown) {
        return
      }
      // console.log(e)
      if (!this.$el.contains(e.target)) {
        this.$emit('close')
      } else if (e.type === 'mousemove') {
        this.isMouseDown = false
      }
    },
    handleMouse(e) {
      this.isMouseDown = e.type === 'mousedown'
    },
    changeRange([min, max]) {
      this.min = min
      this.max = max
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
  .formItem {
    margin-bottom: 30px;
  }
  .formLabel {
    font-size: 1.4rem;
    color: var(--salmon);
    margin-bottom: 0.5em;
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
