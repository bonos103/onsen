<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.panel")
      bar(:style="rangeStyle")
      knob(
        :class="$style.knob",
        :style="minKnobStyle",
        @mousedown.native.prevent="handleKnobStart($event, 'min')",
        @touchstart.native.prevent="handleKnobStart($event, 'min')",
      )
      knob(
        :class="$style.knob",
        :style="maxKnobStyle",
        @mousedown.native.prevent="handleKnobStart($event, 'max')",
        @touchstart.native.prevent="handleKnobStart($event, 'max')",
      )
</template>
<script>
import Bar from '@/components/Form/RangeSliderBar'
import Knob from '@/components/Form/RangeSliderKnob'

export default {
  components: {
    Bar,
    Knob,
  },
  props: {
    value: {
      type: Array,
      default() {
        return [0, 1000]
      },
    },
    steps: {
      type: Array,
      default() {
        return [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
      },
    },
  },
  data() {
    return {
      range: [0, 0],
      origin: { x: 0, y: 0, range: [0, 0] },
      time: undefined,
      isMoving: '',
    }
  },
  computed: {
    stepCount() {
      return this.steps.length || 2
    },
    minKnobStyle() {
      return {
        left: `${this.stepPercentage(this.range[0])}%`,
      }
    },
    maxKnobStyle() {
      return {
        left: `${this.stepPercentage(this.range[1])}%`,
      }
    },
    rangeStyle() {
      return {
        left: `${this.stepPercentage(this.range[0])}%`,
        right: `${100 - this.stepPercentage(this.range[1])}%`,
      }
    },
    movingArg() {
      return this.isMoving === 'min' ? 0 : 1
    },
  },
  mounted() {
    const min = this.valueStep(this.closestValue(this.value[0]))
    const max = this.valueStep(this.closestValue(this.value[1]))
    this.range = [min, max]
  },
  methods: {
    closestValue(value) {
      return [...this.steps].sort((a, b) =>
        Math.abs(value - a) > Math.abs(value - b) ? 1 : -1)[0] || 0
    },
    valueStep(value) {
      const step = this.steps.indexOf(value)
      return (step > 0 && step) || 0
    },
    stepPercentage(step) {
      return (100 / (this.stepCount - 1)) * step
    },
    handleKnobStart(e, target) {
      this.origin = {
        x: e.x,
        y: e.y,
        range: [...this.range],
      }
      this.isMoving = target
      window.addEventListener('mousemove', this.handleKnobMove)
      window.addEventListener('mouseup', this.handleKnobEnd)
    },
    handleKnobMove(e) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = undefined
        }, 100)
        const dx = e.x - this.origin.x
        const dStep = this.moveStep(dx)
        this.change(this.origin.range[this.movingArg] + dStep)
      }
    },
    handleKnobEnd(e) {
      const dx = e.x - this.origin.x
      const dStep = this.moveStep(dx)
      this.change(this.origin.range[this.movingArg] + dStep)

      window.removeEventListener('mousemove', this.handleKnobMove)
      window.removeEventListener('mouseup', this.handleKnobEnd)
      this.isMoving = ''
      this.update()
    },
    moveStep(dx) {
      const stepPx = this.$el.clientWidth / (this.stepCount - 1)
      return Math.round(dx / stepPx)
    },
    change(step) {
      if (this.isMoving === 'min') {
        if (step < 0) {
          this.range = [0, this.range[1]]
        } else if (step >= this.origin.range[1]) {
          this.range = [this.origin.range[1] - 1, this.range[1]]
        } else {
          this.range = [step, this.range[1]]
        }
      } else if (this.isMoving === 'max') {
        if (step <= this.origin.range[0]) {
          this.range = [this.range[0], this.origin.range[0] + 1]
        } else if (step > this.stepCount - 1) {
          this.range = [this.range[0], this.stepCount - 1]
        } else {
          this.range = [this.range[0], step]
        }
      }
    },
    update() {
      const range = [this.steps[this.range[0]], this.steps[this.range[1]]]
      this.$emit('input', range)
    },
  },
}
</script>
<style lang="postcss" module>
  .wrap {
    padding: 4px 6px;
    width: 100%;
  }
  .panel {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: var(--salmon-lightest);
  }
  .knob {
    position: absolute;
    top: 50%;
    z-index: 2;
  }
</style>
