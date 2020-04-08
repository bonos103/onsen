import hokkaido from '@/assets/data/hokkaido.csv'

const data = {
  hokkaido,
}

// 都道府県のCSVデータをマージ＆正規化
const list = Object.entries(data).map(o => (
  o[1].map((i) => {
    i.pref = o[0]
    return i
  })
)).flat(1)

export const state = () => ({
  list,
})

export const getters = {
  getById: state => id => state.list[id],
}
