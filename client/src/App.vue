<template>
  <div id="app" class="container mx-auto text-gray-900 antialiased leading-tight">
    <Search/>
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  name: 'app',
  components: {
    Search
  }
}
</script>
