import csv from '@/assets/data/hokkaido.csv'

export const state = () => ({
  list: csv,
})

export const getters = {
  getById: state => id => state.list[id],
}
