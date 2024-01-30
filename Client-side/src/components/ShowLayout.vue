<script>
import ShowNavbar from './ShowNavbar.vue'
export default {
  components: { ShowNavbar },
  name: "Layout"
}
</script>


<template>
  <show-navbar></show-navbar>
  <RouterView></RouterView>
</template>

<style>

</style>