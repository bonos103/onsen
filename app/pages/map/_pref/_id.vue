<template lang="pug">
  div.transition(:class="$style.wrap")
    //- div(:class="$style.empty")
    div(:class="$style.block")
      div(:class="$style.swipe", @click="handleBack")
        img(src="@/assets/images/commons/swipe_down.svg?inline")
      div(:class="$style.container")
        h1(:class="$style.name") {{item.name}}
        div(:class="$style.item", v-if="item.price")
          div(:class="$style.label") 料金
          div(:class="$style.value") {{formatPrice}}
        div(:class="$style.item")
          div(:class="$style.label") ホームページ
          div(:class="$style.value")
            div(v-if="item.url")
              a(:href="item.url", target="_blank") {{item.url}}
              p(:class="$style.orText") または
            div(v-else)
              p(:class="$style.noUrl") 登録されていません。
            div(:class="$style.googleLink")
              a(:href="`https://www.google.com/search?q=${encodeURIComponent(item.name)}`", target="_blank") ｢{{item.name}}｣をGoogle検索する

        div(:class="$style.item", v-if="item.address")
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
        :src="`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(item.address)}+${encodeURIComponent(item.name)}`",
        allowfullscreen,
        :key="item.id",
      )
      div(:class="$style.copyright")
        | © 2020&nbsp;
        nuxt-link(:to="{ name: 'index' }") FUROMAP
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    if (!this.item) {
      return {}
    }
    const title = `${this.item.name}`
    const description = `${this.prefecture.name}の${this.item.name}は${this.item.address}にある${this.item.type}です。料金は${this.formatPrice}。ホームページや詳細地図も掲載しています。またFUROMAPでは全国の温泉・銭湯を探せます。`
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'description', name: 'description', content: description },
      ],
    }
  },
  transition: {
    name: 'fade',
  },
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
    ...mapGetters('onsen', {
      getPrefecture: 'getPrefecture',
    }),
    prefecture() {
      return this.getPrefecture(this.$route.params.pref) || {}
    },
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
    formatPrice() {
      const value = this.item.price || ''
      if (value === 0) {
        return '無料 もしくは 寸志'
      }
      if (typeof value === 'number') {
        return `¥${value.toLocaleString('ja-JP')}`
      }
      return value
    },
  },
  methods: {
    calcHeight() {
      this.windowHeight = window.innerHeight
    },
    handleBack() {
      this.$router.back()
    },
  },
}
</script>
<style lang="postcss" scoped>
  .fade-enter,
  .fade-leave-to {
    transform: translateY(100%);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.2s ease-in-out;
  }
</style>
<style lang="postcss" module>
  .wrap {
    position: fixed;
    top: 30vh;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 10px 10px;
    @media (--md) {
      top: 50vh;
    }
  }
  .block {
    width: 100%;
    max-width: 1040px;
    height: 100%;
    background-color: var(--salmon-lightest);
    border-radius: 10px;
    box-shadow: 0 0 10px color(var(--black) a(20%));
    padding-top: 40px;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .swipe {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .container {
    max-width: calc(var(--wrap-width) + var(--padding) * 2);
    padding-left: var(--padding);
    padding-right: var(--padding);
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
  .noUrl {
    font-size: 1.3rem;
    color: var(--gray-darker);
    margin-bottom: 0.5em;
  }
  .googleLink {
    & a {
      font-size: 1.4rem;
      color: var(--blue);
    }
  }
  .orText {
    font-size: 1.3rem;
    color: var(--gray-darker);
    margin: 0.5em 0;
  }
  .mapLink {
    font-size: 1.4rem;
    color: var(--blue);
    margin-top: 2em;
    margin-bottom: 1.2em;
  }
  .map {
    width: 100%;
    max-height: 48vh;
  }
  .copyright {
    font-size: 1.3rem;
    color: var(--gray-darkest);
    text-align: center;
    padding: 10px;
    & a {
      color: var(--salmon);
      text-decoration: underline;
    }
  }
</style>
