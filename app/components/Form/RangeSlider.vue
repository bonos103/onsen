<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.panel")
      div(:class="$style.range", :style="rangeStyle")
      div(:class="$style.knob", :style="minKnobStyle")
      div(:class="$style.knob", :style="maxKnobStyle")
</template>
<script>
export default {
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
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--salmon);
    box-shadow: 0 0 4px color(var(--black) a(10%));
    transform: translate(-50%, -50%);
    cursor: ew-resize;
    z-index: 2;
  }
</style>
