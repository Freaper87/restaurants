<template>
  <div class="font-sans">
    <h1>search</h1> 
    <form action="/restaurants" method="post" id="submitForm" @submit="handleSubmit">
        Longitude: <input type="name" id="Longitude" v-model.number="longitudeValue"><br>
        Latitude: <input type="name" id="Latitude" v-model.number="latitudeValue"><br>
        Radius: <input type="name" id="Radius" v-model="radiusValue"><br>
        <button type="submit" id="submitButton" class="button">Submit</button>
    </form>
    {{ radiusValue }}
    <div v-if="api.result" class="flex flex-wrap">
      <ul v-for="(location, index) in api.result.results" v-bind:key="index" >
        <Card v-bind:data="location" v-bind:lon="longitudeValue" v-bind:lat="latitudeValue" />
      </ul>
    </div>
  </div>
</template>

<script>
import ApiService from '../ApiService'
import Card from './Card.vue'
export default {
  name: 'Search',
  components: {
    Card
  },
  data() {
    return {
      api: '',
      error: '',
      longitudeValue: null,
      latitudeValue: null,
      radiusValue: 1209
    }
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      let submitForm = document.getElementById('submitForm');
      let latitude = this.latitudeValue;
      let longitude = this.longitudeValue;
      let radius = this.radiusValue;
      e.preventDefault();
      var data = {latitude, longitude, radius};
      this.api = await ApiService.postPlaces(data);
    }
  },
  async mounted() {
    try {
      this.api = await ApiService.getApi();
      readGeoLocation: {
        let vm = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
                vm.longitudeValue = position.coords.longitude;
                vm.latitudeValue = position.coords.latitude;
            })
        }     
      }  
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>