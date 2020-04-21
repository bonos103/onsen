<template lang="pug">
  div(:class="$style.wrap")
    //- div(:class="$style.empty")
    div(:class="$style.block")
      div(:class="$style.swipe", @click="handleBack")
        img(src="@/assets/images/commons/swipe_down.svg")
      div(:class="$style.container")
        h1(:class="$style.name") {{item.name}}
        div(:class="$style.item")
          div(:class="$style.label") 料金
          div(:class="$style.value") {{item.price}}
        div(:class="$style.item")
          div(:class="$style.label") ホームページ
          div(:class="$style.value")
            a(:href="item.url", target="_blank") {{item.url}}
        div(:class="$style.item")
          div(:class="$style.label") 住所
          div(:class="$style.value") {{item.address}}
        div(:class="$style.mapLink")
          a(:href="item.map", target="_blank") GoogleMAPで開く
      iframe(
        :class="$style.map",
        width="600",
        height="450",
        frameborder="0",
        style="border:0",
        :src="`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(item.address)}`",
        allowfullscreen,
        :key="item.id",
      )
</template>
<script>
export default {
  asyncData({ params, store }) {
    return {
      item: store.getters['onsen/getByPrefAndId'](params.pref, params.id),
    }
  },
  data() {
    return {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      windowHeight: 0,
    }
  },
  computed: {
    blockStyle() {
      if (this.windowHeight === 0) {
        return {
          marginTop: '100vh',
        }
      }
      return {
        marginTop: `${this.windowHeight}px`,
      }
    },
  },
  mounted() {
    this.$listen(document, 'touchmove', this.stopScroll, { passive: false })
    document.body.style.overflow = 'hidden'
  },
  beforeUpdate() {
    console.log('before update')
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from)
    next()
  },
  beforeDestroy() {
    document.body.style.overflow = ''
  },
  methods: {
    stopScroll(event) {
      event.preventDefault()
    },
    calcHeight() {
      this.windowHeight = window.innerHeight
    },
    handleBack() {
      this.$router.back()
    },
  },
}
</script>
<style module>
  .wrap {
    position: fixed;
    top: calc(100vh - 300px);
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--salmon-lightest);
    overflow: auto;
  }
  .block {
    width: 100%;
    padding-top: 30px;
    padding-left: var(--padding);
    padding-right: var(--padding);
  }
  .swipe {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .container {
    max-width: var(--wrap-width);
    margin-left: auto;
    margin-right: auto;
  }
  .name {
    font-size: 1.8rem;
    font-weight: bold;
    line-height: 1.25;
    margin-bottom: 1.5em;
  }
  .item {
    margin-bottom: 30px;
  }
  .label {
    font-size: 1.4rem;
    color: var(--gray-darkest);
    margin-bottom: 0.8em;
  }
  .value {
    font-size: 1.6rem;
    color: var(--black);
    line-height: 1.5;
    word-break: break-all;
    & a {
      color: var(--salmon);
    }
  }
  .mapLink {
    font-size: 1.4rem;
    color: var(--blue);
    margin-top: 3em;
    margin-bottom: 1em;
  }
  .map {
    width: 100%;
  }
</style>
