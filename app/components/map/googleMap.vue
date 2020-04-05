<template lang="pug">
  div(ref="map", :class="$style.map")
</template>
<script>
import { mapState } from 'vuex'
import GoogleMapsApiLoader from 'google-maps-api-loader'
import MarkerClusterer from '@google/markerclustererplus'

export default {
  data() {
    return {
      google: null,
      map: null,
      markers: [],
    }
  },
  computed: {
    ...mapState('onsen', {
      items: 'list',
    }),
    locations() {
      if (!this.items.length) {
        return []
      }
      return this.items.map(item => ({ lat: item.lat, lng: item.lng }))
    },
  },
  async mounted() {
    await this.loadMap()
    if (this.google) {
      this.createMarkers()
      this.addCluster()
    }
  },
  methods: {
    async loadMap() {
      this.google = await GoogleMapsApiLoader({
        apiKey: process.env.GOOGLE_API_KEY,
      })
      this.map = new this.google.maps.Map(this.$refs.map, {
        center: { lat: 43.0640573, lng: 141.3551388 },
        zoom: 8,
        disableDefaultUI: true,
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
    addCluster() {
      return new MarkerClusterer(this.map, this.markers, {
        // imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        // imageExtension: 'png',
        // imageSizes: [30, 40, 50],
        gridSize: 60,
        maxZoom: 11,
        averageCenter: true,
        minimumClusterSize: 4,

        styles: [
          {
            width: 30,
            height: 30,
            textColor: '#fff',
            className: this.$style.cluster1,
          },
          {
            width: 35,
            height: 35,
            textColor: '#fff',
            className: this.$style.cluster2,
          },
          {
            width: 40,
            height: 40,
            textColor: '#fff',
            className: this.$style.cluster3,
          },
        ],
      })
    },
  },
}
</script>
<style lang="postcss" module>
  .map {
    width: 100%;
    height: 500px;
  }
  .cluster1 {
    line-height: 30px;
    background-color: #FBD27B;
    border-radius: 50%;
    box-shadow: 0 0 10px #FBD27B;
  }
  .cluster2 {
    line-height: 35px;
    background-color: #FEA354;
    border-radius: 50%;
    box-shadow: 0 0 10px #FEA354;
  }
  .cluster3 {
    line-height: 40px;
    background-color: #F55F49;
    border-radius: 50%;
    box-shadow: 0 0 10px #F55F49;
  }
</style>
