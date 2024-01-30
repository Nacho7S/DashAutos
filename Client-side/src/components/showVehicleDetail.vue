<script>
import { mapActions, mapState } from 'pinia'
import { useVehicleStore } from '../stores/vehicle'
export default {
  name: "vehicleDetails",
  computed: {
    loading() {
      return !this.vehicleDetail;
    },
    ...mapState(useVehicleStore, ['vehicleDetail', 'createdUserVehicle'])
  },
  methods: {
    ...mapActions(useVehicleStore, [ 'fetchVehicle','fetchDetailVehicle', 'kmFormat', 'formatCurrencies'])
  },
  created() {
    const { id } = this.$route.params
    this.fetchDetailVehicle(id)

  }
}
</script>

<template>
  <!-- <p >{{ createdUserVehicle.firstName }}</p> -->
  <p v-if="loading" class="d-flex justify-content-center">Loading...</p>
  <div class="shadow detail" style="background-color: rgb(228, 249, 247);">
    <div class="position-detail">
      <div class="d-flex flex-row">
        <h1 class="shadow rounded p-2 text-title">{{ vehicleDetail.yearRelease }} {{ vehicleDetail.brand }} {{ vehicleDetail.model }}</h1>
        <h1 v-if="vehicleDetail.Type" class="rounded align-self-center p-2 ms-2 text-type">{{ vehicleDetail.Type.name }}</h1>
      </div>
      <div class="d-flex mt-4">
        <img :src="vehicleDetail.imgUrl" class="img">
        <div class="d-flex flex-column ms-4 flex-wrap border-top border-bottom description">
          <div class="d-flex flex-row">
            <p>VIN:</p>
            <p class="ms-2">{{ vehicleDetail.vin}}</p>
          </div>
          <div class="d-flex flex-row">
            <p>Brand:</p>
            <p class="ms-2">{{ vehicleDetail.brand}}</p>
          </div>
          <div class="d-flex flex-row">
            <p>Model:</p>
            <p class="ms-2">{{ vehicleDetail.model}}</p>
          </div>
          <div class="d-flex flex-row">
            <p>Transmission:</p>
            <p class="ms-2">{{ vehicleDetail.transMission}}</p>
          </div>
          <div class="d-flex flex-row">
            <p>Features:</p>
            <p class="ms-2">{{ vehicleDetail.features}}</p>
          </div>
          <div class="d-flex flex-row">
            <p>Milleage:</p>
            <p class="ms-2">{{ kmFormat(vehicleDetail.milleage)}}</p>
          </div>
          <div class="d-flex flex-row">
            <p>CurrentLocation:</p>
            <p class="ms-2">{{ vehicleDetail.currentLocation }}</p>
          </div>
        </div>
      </div>
      <div class="mt-2 d-flex flex-row ms-5">
        <h4>Price: {{ formatCurrencies(vehicleDetail.price) }}</h4>
        <h4 class="ms-5">Contact: {{ createdUserVehicle.firstName }} 0{{ createdUserVehicle.phoneNumber }}</h4>
      </div>
    </div>
  </div>
</template>

<style>
.description{
  background-color: aliceblue;
  border-radius: 2%;
  width: 47%;
  padding: 1%;
}

.text-title{
  background-color: rgb(0, 198, 198);
  color: azure;
  width: 50%;
}

.text-type{
  background-color: rgb(123, 240, 174);
  color: azure;
  width: 25%;
}

.detail{
  border-radius: 15px;
  max-width: 89%;
  margin-left: 6%;
}

.position-detail{
  padding: 2%;
  margin-top: 10%;
}
.img{
  width: 50%;
  border-radius: 10px;
}
</style>