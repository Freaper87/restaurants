<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg m-4">
  <img v-if="data.photos" class="w-full" :src="photoResponse.photo" alt="Sunset in the mountains">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{{data.name}}</div>
    <p class="text-gray-700 text-base">
      {{error}}
    </p>
  </div>
  <div class="px-6 py-4">
    <span v-if="data.opening_hours" :class="[data.opening_hours.open_now == true ? 'bg-green-200' : 'bg-gray-200']" class="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{{data.opening_hours.open_now == true ? 'open' : 'closed'}}</span>
    <span v-if="data.rating" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">rating: {{data.rating}} / 5</span>
    <span v-if="data.geometry" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">distance: {{calculateDistance(data.geometry.location.lat, lat, data.geometry.location.lng, lon)}} m</span>
  </div>
</div>
</template>

<script>
import ApiService from '../ApiService'
export default {
    name: 'Card',
    data() {
        return {
            photoResponse: '',
            error: ''
        }
    },
    props: ['data', 'lon', 'lat'],
    async mounted() {
        try {
            if (this.data.photos) {
                this.photoResponse = await ApiService.postPhoto(this.data.photos[0].photo_reference);
            }
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        calculateDistance(lat1, lat2, lon1, lon2) {
            
            var R = 6371e3; // metres
            var φ1 = lat1 * (Math.PI/180);
            var φ2 = lat2 * (Math.PI/180);
            var Δφ = (lat2-lat1) * (Math.PI/180);
            var Δλ = (lon2-lon1) * (Math.PI/180);

            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            var d = R * c;
            return Math.round(d);
        }
    }
}
</script>