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
        div(:class="$style.rangeSlider")
          range-slider(
            :value="range"
            :steps="steps",
            @input="updateRange",
          )
      div(:class="$style.formItem")
        div(:class="$style.formLabel") エリア
        form-select(:value="prefecture")
          option(value="") 都道府県で絞り込み
          option(v-for="pref in prefectures", :key="pref.value", :value="pref.value") {{pref.name}}
</template>
<script>
import { mapState } from 'vuex'
import FormSelect from '@/components/Form/Select'
import RangeSlider from '@/components/Form/RangeSlider'

export default {
  components: {
    FormSelect,
    RangeSlider,
  },
  props: {
    steps: {
      type: Array,
      required: true,
      default() {
        return [0, 1, 2]
      },
    },
    range: {
      type: Array,
      required: true,
      default() {
        return [0, 2]
      },
    },
    prefecture: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('onsen', {
      prefectures: 'prefectures',
    }),
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
    updateRange(range) {
      this.$emit('change:range', range)
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
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 20px;
    }
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
    top: 20px;
    left: 20px;
  }

  .rangeSlider {
    padding-right: 10px;
  }
</style>
