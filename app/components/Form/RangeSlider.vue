<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.panel")
      div(:class="$style.range", :style="rangeStyle")
      knob(
        :class="$style.knob",
        :style="minKnobStyle",
      )
      knob(
        :class="$style.knob",
        :style="maxKnobStyle",
        @mousedown.native.prevent="handleKnobStart($event, 'max')",
        @touchstart.native.prevent="handleKnobStart($event, 'max')",
      )
</template>
<script>
import Knob from '@/components/Form/RangeSliderKnob'

export default {
  components: {
    Knob,
  },
  props: {
    minValue: { type: Number, default: 0 },
    maxValue: { type: Number, default: 150 },
    steps: {
      type: Array,
      default() {
        return [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
      },
    },
  },
  data() {
    return {
      min: this.minValue,
      max: this.maxValue,
      origin: { x: 0, y: 0 },
      time: undefined,
      isMoving: '',
    }
  },
  computed: {
    stepCount() {
      return this.steps.length || 0
    },
    minStep() {
      return this.valueStep(this.min)
    },
    maxStep() {
      return this.valueStep(this.max)
    },
    minKnobStyle() {
      return {
        left: `${this.stepPercentage(this.minStep)}%`,
      }
    },
    maxKnobStyle() {
      return {
        left: `${this.stepPercentage(this.maxStep)}%`,
      }
    },
    rangeStyle() {
      return {
        left: `${this.stepPercentage(this.minStep)}%`,
        right: `${100 - this.stepPercentage(this.maxStep)}%`,
      }
    },
  },
  mounted() {
    this.min = this.closestValue(this.min)
    this.max = this.closestValue(this.max)
  },
  methods: {
    closestValue(value) {
      return [...this.steps].sort((a, b) =>
        Math.abs(value - a) > Math.abs(value - b) ? 1 : -1)[0] || 0
    },
    valueStep(value) {
      return this.steps.indexOf(value)
    },
    stepPercentage(step) {
      return (100 / this.stepCount) * step
    },
    handleKnobStart(e, target) {
      console.log(e)
      this.origin = {
        x: e.x,
        y: e.y,
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
        this.change(this[this.isMoving] + dStep)
      }
    },
    handleKnobEnd(e) {
      const dx = e.x - this.origin.x
      const dStep = this.moveStep(dx)
      this.change(this[this.isMoving] + dStep)

      window.removeEventListener('mousemove', this.handleKnobMove)
      window.removeEventListener('mouseup', this.handleKnobEnd)
      this.isMoving = ''
      this.$emit('change', [this.min, this.max])
    },
    moveStep(dx) {
      if (dx === 0) {
        return 0
      }
      const stepPx = this.$el.clientWidth / (this.stepCount - 1)
      return Math.round(dx / stepPx)
    },
    change(step) {
      if (this.isMoving === 'min') {
        if (step < 0) {
          this.min = 0
        } else if (step > this.max) {
          this.min = this.max
        } else {
          this.min = step
        }
      } else if (this.isMoving === 'max') {
        if (step < this.min) {
          this.max = this.min
        } else if (step > this.stepCount) {
          this.max = this.stepCount
        } else {
          this.max = step
        }
      }
    },
  },
}
</script>
<style lang="postcss" module>
  .wrap {
    padding: 4px 0;
    width: 100%;
  }
  .panel {
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 2.5px;
    background-color: var(--salmon-lightest);
  }
  .range {
    position: absolute;
    top: 0;
    height: 5px;
    border-radius: 2.5px;
    background-color: var(--salmon);
  }
  .knob {
    position: absolute;
    top: 50%;
    z-index: 2;
  }
</style>
