import prefectures from '@/assets/data/prefectures'
import hokkaido from '@/assets/data/hokkaido.yaml'

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
  ...data,
  prefectures,
})

export const getters = {
  getByPrefAndId: state => (pref, id) => state[pref].find(i => String(i.id) === String(id)),
}
