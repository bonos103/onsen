<template lang="pug">
  div(:class="$style.container")
    div
      h2(:class="$style.subtitle") 地図から全国の温泉・銭湯を探す
      h1(:class="$style.title")
        logo
      div
        nuxt-link(:to="{ name: 'map' }", :class="$style.button") お風呂を探しに行く
      div(:class="$style.description")
        p
          | 旅をしていて、今日のお風呂を探すとき、
        p
          | 意外とGoogleマップで温泉・銭湯が見つからず、
          br
          | 「地名 銭湯」で検索して、
          br(:class="$style.brSp")
          | 近場で安いところを探していました。
        p
          | その検索に煩わしさを感じたので、
          br(:class="$style.brSp")
          | 地図から金額別で探せて、
          br
          | ワンクリックで公式サイトなどを調べられる
          br(:class="$style.brSp")
          | 非常にシンプルなサイトにしました。
        p
          |是非ご利用ください。
</template>
<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  },
  head() {
    const title = 'サービスについて'
    const description = '地図から全国の温泉・銭湯を探せます。旅をしていて、今日のお風呂を探すとき、意外とGoogleマップで温泉・銭湯が見つからず、「地名 銭湯」で検索して、近場で安いところを探していました。その検索に煩わしさを感じたので、地図から金額別で探せて、ワンクリックで公式サイトなどを調べられる非常にシンプルなサイトにしました。'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'description', name: 'description', content: description },
      ],
    }
  },
}
</script>
<style lang="postcss" module>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background-color: var(--salmon-lightest);
  padding: 40px 20px;
  margin: 0 auto;
}
.title {
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  & svg {
    max-width: 300px;
    width: 100%;
    height: auto;
  }
  @media (--md) {
    margin-bottom: 60px;
    & svg {
      max-width: 400px;
    }
  }
}
.subtitle {
  font-size: 1.6rem;
  font-weight: normal;
  color: var(--black);
  text-align: center;
  margin-bottom: 1.5em;
  @media (--md) {
    font-size: 1.8rem;
  }
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--white);
  background-color: var(--salmon);
  border-radius: 0.3em;
  box-shadow: 0 3px 6px color(var(--black) a(20%));
  padding: 1em 2em;
  @media (--md) {
    font-size: 2.2rem;
  }
}
.description {
  font-size: 1.3rem;
  color: var(--black);
  line-height: 2;
  margin-top: 40px;
  & p {
    margin-bottom: 1em;
  }
  @media (--md) {
    font-size: 1.4rem;
    margin-top: 60px;
  }
}
.brSp {
  @media (--md) {
    display: none;
  }
}
</style>
