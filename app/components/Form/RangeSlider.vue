<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.panel", ref="panel")
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
      pop-value(:style="minValueStyle", :value="minValueFormat")
      pop-value(:style="maxValueStyle", :value="maxValueFormat")
</template>
<script>
import Bar from '@/components/Form/RangeSliderBar'
import Knob from '@/components/Form/RangeSliderKnob'
import PopValue from '@/components/Form/RangeSliderValue'

export default {
  components: {
    Bar,
    Knob,
    PopValue,
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
    minValue() {
      const value = this.steps[this.range[0]]
      return value !== undefined ? value : ''
    },
    maxValue() {
      const value = this.steps[this.range[1]]
      return value !== undefined ? value : ''
    },
    minValueFormat() {
      return `¥${this.minValue.toLocaleString('ja-JP')}`
    },
    maxValueFormat() {
      const suffix = (this.maxValue === this.steps[this.stepCount - 1]) ? '~' : ''
      return `¥${this.maxValue.toLocaleString('ja-JP')}${suffix}`
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
    minValueStyle() {
      return {
        position: 'absolute',
        top: '-12px',
        left: `${this.stepPercentage(this.range[0])}%`,
      }
    },
    maxValueStyle() {
      return {
        position: 'absolute',
        top: '-12px',
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
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
        range: [...this.range],
      }
      this.isMoving = target
      window.addEventListener('mousemove', this.handleKnobMove, { passive: false })
      window.addEventListener('touchmove', this.handleKnobMove, { passive: false })
      window.addEventListener('mouseup', this.handleKnobEnd, { passive: false })
      window.addEventListener('touchend', this.handleKnobEnd, { passive: false })
    },
    handleKnobMove(e) {
      e.preventDefault()
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = undefined
        }, 100)
        const dx = (e.clientX || e.touches[0].clientX) - this.origin.x
        const dStep = this.moveStep(dx)
        this.change(this.origin.range[this.movingArg] + dStep)
      }
    },
    handleKnobEnd(e) {
      e.preventDefault()
      window.removeEventListener('mousemove', this.handleKnobMove, { passive: false })
      window.removeEventListener('touchmove', this.handleKnobMove, { passive: false })
      window.removeEventListener('mouseup', this.handleKnobEnd, { passive: false })
      window.removeEventListener('touchend', this.handleKnobEnd, { passive: false })
      this.isMoving = ''
      this.update()
    },
    moveStep(dx) {
      const stepPx = this.$refs.panel.clientWidth / (this.stepCount - 1)
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
      const range = [this.minValue, this.maxValue]
      this.$emit('input', range)
    },
  },
}
</script>
<style lang="postcss" module>
  .wrap {
    padding: 38px 6px 4px;
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
