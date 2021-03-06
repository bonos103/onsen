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

const trimPriceRange = (range, steps) => {
  const trimming = (r) => {
    if (typeof r === 'string' && typeof Number(r) === 'number') {
      return [Number(r), steps[steps.length - 1]]
    }
    if (Array.isArray(r)) {
      if (r.length === 1) {
        return [r[0], steps[steps.length - 1]]
      }
      return [r[0], r[1]]
    }
    return [steps[0], steps[steps.length - 1]]
  }
  const trimRange = trimming(range)
  if (trimRange[1] > steps[steps.length - 1]) {
    trimRange[1] = steps[steps.length - 1]
  }
  return trimRange
}

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
      const isLess = !range[1] || range[1] === state.steps[state.steps.length - 1] || price <= range[1]
      return isMore && isLess
    }
    return list.filter((item) => {
      return typeof item.price !== 'number' || rangeFitler(item.price, priceRange)
    })
  },
  getPrefecture: state => pref => state.prefectures.find(p => p.value === (pref || state.filters.pref)),
  center: (state) => {
    if (state.filters.pref) {
      const prefInfo = state.prefectures.find(p => p.value === state.filters.pref)
      if (prefInfo) {
        return {
          lat: prefInfo.lat,
          lng: prefInfo.lng,
        }
      }
    }
    return { lat: 39.365596, lng: 136.866669 }
  },
  zoom: (state) => {
    if (state.filters.pref === 'hokkaido') {
      return 7
    }
    if (state.filters.pref) {
      return 8
    }
    return 5
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
  setFilters({ commit, state }, { pref, priceRange }) {
    commit('setFilters', { pref, priceRange: trimPriceRange(priceRange, state.steps) })
  },
  initList({ commit }) {
    commit('initList')
  },
}
