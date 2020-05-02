import prefectures from '@/assets/data/prefectures'
import prefecturesData from '@/assets/data/prefecturesData'

// 都道府県のCSVデータをマージ＆正規化
const list = Object.entries(prefecturesData).map(o => (
  o[1].map((i) => {
    i.pref = o[0]
    return i
  })
)).flat(1)

export const state = () => ({
  list,
  ...prefecturesData,
  prefectures,
})

export const getters = {
  getByPrefAndId: state => (pref, id) => state[pref].find(i => String(i.id) === String(id)),
}
