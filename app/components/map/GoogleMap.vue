<template lang="pug">
  div(ref="map", :class="$style.map")
</template>
<script>
import _isEqual from 'lodash/isEqual'
import { mapGetters, mapState } from 'vuex'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import MarkerClusterer from '@google/markerclustererplus'
import clusterImage1 from '@/assets/images/map/cluster1.png'
import clusterImage2 from '@/assets/images/map/cluster2.png'
import clusterImage3 from '@/assets/images/map/cluster3.png'

export default {
  data() {
    return {
      cluster: null,
      google: null,
      map: null,
      markers: [],
      markerIcons: [],
    }
  },
  computed: {
    ...mapState('onsen', {
      filteredPrefecture: state => state.filters.pref,
    }),
    ...mapGetters('onsen', {
      items: 'filteredList',
      center: 'center',
      zoom: 'zoom',
    }),
    locations() {
      if (!this.items.length) {
        return []
      }
      return this.items.map(item => ({ lat: item.lat, lng: item.lng }))
    },
  },
  watch: {
    items(next, prev) {
      // TODO 0件の場合アラートを表示
      if (!_isEqual(next, prev)) {
        this.reset()
        this.createMarkers()
        setTimeout(this.addCluster, 100)
      }
    },
    filteredPrefecture(next, prev) {
      if (next !== prev) {
        const zoom = window.innerWidth < 768 ? this.zoom : this.zoom + 1
        this.map.setZoom(zoom)
        this.map.setCenter(this.center)
      }
    },
  },
  async mounted() {
    await this.loadMap()
    if (this.google) {
      this.markerIcons = [
        this.createMarkerIcon('/images/map/marker1.png'),
        this.createMarkerIcon('/images/map/marker2.png'),
        this.createMarkerIcon('/images/map/marker3.png'),
        this.createMarkerIcon('/images/map/marker4.png'),
      ]
      this.createMarkers()
      this.addCluster()
    }
  },
  methods: {
    async loadMap() {
      this.google = await GoogleMapsApiLoader({
        apiKey: process.env.GOOGLE_API_KEY,
      })
      // const center = await this.getCurrentPosition()
      // const center = { lat: 39.365596, lng: 136.866669 }
      const zoom = window.innerWidth < 768 ? this.zoom : this.zoom + 1
      this.map = new this.google.maps.Map(this.$refs.map, {
        center: this.center,
        zoom,
        disableDefaultUI: true,
      })
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        const basePosition = { lat: 43.0640573, lng: 141.3551388 }
        if (navigator && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude
              const lng = position.coords.longitude
              return resolve({ lat, lng })
            },
            (err) => {
              switch (err.code) {
                // PERMISSION_DENIED
                case 1:
                  alert('位置情報の利用が許可されていません')
                  break
                // POSITION_UNAVAILABLE
                case 2:
                  alert('現在位置が取得できませんでした')
                  break
                // TIMEOUT
                case 3:
                  alert('タイムアウトになりました')
                  break
                default:
                  alert(`その他のエラー(エラーコード:${err.code})`)
                  break
              }
              resolve(basePosition)
            },
            {
              enableHighAccuracy: false,
            },
          )
        } else {
          return resolve(basePosition)
        }
      })
    },
    createMarker(item) {
      const self = this
      const location = {
        lat: item.lat,
        lng: item.lng,
      }
      const marker = new this.google.maps.Marker({
        position: location,
        icon: this.markerIcons[this.markerLevelOf(item)],
      })
      marker.addListener('click', () => {
        self.$emit('click-marker', item)
      })
      return marker
    },
    createMarkers() {
      this.markers = this.items.map((item) => {
        return this.createMarker(item)
      })
    },
    createMarkerIcon(path) {
      return new this.google.maps.MarkerImage(
        path, // マーカー画像URL
        null,
        new this.google.maps.Point(0, 0), // マーカー画像表示の起点（変更しない）
        new this.google.maps.Point(13.5, 40), // マーカー位置の調整
        new this.google.maps.Size(27, 40), // マーカー画像のサイズ
      )
    },
    addCluster() {
      this.cluster = new MarkerClusterer(this.map, this.markers, {
        // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        // imageExtension: 'png',
        // imageSizes: [30, 40, 50],
        enableRetinaIcons: true,
        // gridSize: 60,
        maxZoom: 11,
        averageCenter: true,
        minimumClusterSize: 4,

        styles: [
          {
            url: clusterImage1,
            width: 40,
            height: 46.5,
            anchorIcon: [46.5, 20],
            anchorText: [9, 0],
            // textColor: '#fff',
            className: this.$style.cluster1,
          },
          {
            url: clusterImage2,
            width: 45,
            height: 52.315,
            anchorIcon: [52.315, 22.5],
            anchorText: [11.5, 0],
            // textColor: '#fff',
            className: this.$style.cluster2,
          },
          {
            url: clusterImage3,
            width: 50,
            height: 58.125,
            anchorIcon: [58.125, 25],
            anchorText: [14, 0],
            // textColor: '#fff',
            className: this.$style.cluster3,
          },
        ],
      })
    },
    markerLevelOf(item) {
      if (typeof item.price !== 'number' || item.price >= 1000) {
        return 3
      }
      if (item.price >= 700) {
        return 2
      }
      if (item.price >= 400) {
        return 1
      }
      return 0
    },
    reset() {
      this.cluster.setMap(null)
      this.markers.forEach(m => m.setMap(null))
      this.cluster = null
      this.markers = []
    },
  },
}
</script>
<style lang="postcss" module>
  .map {
    width: 100%;
    min-height: 300px;
    height: 100%;
  }
  .cluster1 {
    font-size: 1.6rem;
    color: var(--blue-dark);
  }
  .cluster2 {
    font-size: 1.6rem;
    color: var(--green-dark);
  }
  .cluster3 {
    font-size: 1.6rem;
    color: var(--salmon-dark);
  }
</style>
