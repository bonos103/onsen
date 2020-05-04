import prefectures from '@/assets/data/prefectures'
import prefecturesData from '@/assets/data/prefecturesData'
// import pd from '@/assets/data/prefecturesData'

// const prefecturesData = { hokkaido: pd.hokkaido }

// 都道府県のCSVデータをマージ＆正規化
const list = Object.entries(prefecturesData).map(o => (
  o[1].map((i) => {
    i.pref = o[0]
    return i
  })
)).flat(1)

export const state = () => ({
  // list: [],
  list,
  ...prefecturesData,
  prefectures,
  filters: {
    pref: '',
    priceRange: [0, 1000],
  },
  steps: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
})

export const getters = {
  getByPrefAndId: state => (pref, id) => state[pref].find(i => String(i.id) === String(id)),
  filteredList: (state) => {
    const { pref, priceRange } = state.filters
    const list = pref ? state[pref] : state.list
    const rangeFitler = (price, range = priceRange) => {
      const isMore = price >= range[0]
      const isLess = range[1] === 0 || price <= range[1]
      return isMore && isLess
    }
    return list.filter((item) => {
      return typeof item.price !== 'number' || rangeFitler(item.price, priceRange)
    })
  },
}

export const mutations = {
  setFilters(state, { pref, priceRange }) {
    if (pref !== undefined) {
      state.filters.pref = pref
    }
    if (priceRange !== undefined) {
      state.filters.priceRange = priceRange
    }
    // state.filters = { ...state.filters, ...{ pref, priceRange } }
  },
  initList(state) {
    // 都道府県のCSVデータをマージ＆正規化
    const list = Object.entries(prefecturesData).map(o => (
      o[1].map((i) => {
        i.pref = o[0]
        return i
      })
    )).flat(1)
    state.list = list
    return Object.assign(state, prefecturesData)
  },
}

export const actions = {
  setFilters({ commit }, data) {
    commit('setFilters', data)
  },
  initList({ commit }) {
    commit('initList')
  },
}
