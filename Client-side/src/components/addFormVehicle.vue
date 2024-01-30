<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useVehicleStore } from '../stores/vehicle'

const widget = cloudinary.createUploadWidget(
  { cloudName: 'dmepbhhlw', uploadPreset: 'das-autos' },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info)
      console.log(result.info.url)
      localStorage.setItem('imgUrl', result.info.url)
      document.getElementById('uploadedimage').setAttribute('src', result.info.secure_url)
    }
  }
)
export default {
  name: 'AddFormVehicle',
  data() {
    return {
      addVehicleForm: {
        vin: '',
        brand: '',
        imgUrl: localStorage.getItem('imgUrl'),
        model: '',
        transMission: '',
        yearRelease: '',
        milleage: '',
        price: '',
        TypeId: '',
        features: '',
        currentLocation: '',
        condition: ''
      },
      open: function () {
        widget.open()
      }
    }
  },
  computed: {
    ...mapState(useVehicleStore, ['types', 'verifiedVin'])
  },
  methods: {
    ...mapActions(useVehicleStore, ['fetchType', 'verifyVin', 'addVehicle']),
    handleVerifyVin() {
      this.imgUrl = localStorage.getItem('imgUrl')
      this.verifyVin(this.addVehicleForm.vin)
    },
    handleSubmitAdd() {
      // this.addVehicle
      this.imgUrl = localStorage.getItem('imgUrl')
      this.addVehicle(this.addVehicleForm)
    }
  },
  created() {
    this.imgUrl = localStorage.getItem('imgUrl')
    this.fetchType()
    this.verifiedVin
  }
}
</script>

<template>
  <form class="container" @submit.prevent="handleSubmitAdd">
    <div class="d-flex justify-content-center">
      <div class="form-add shadow rounded pe-4">
        <div class="align-self-end ms-5 me-4 form-floating">
          <h5>Here Input Image...</h5>
          <button id="upload_widget" class="button" @click.prevent="open">Upload files</button>
        </div>
        <div class="rounded w-75 p-4 ms-3" style="background-color: rgb(185, 250, 245)">
          <h1 class="font text-center">Sell Your Car here</h1>

          <div class="input-form d-flex flex-wrap">
            <form class="container" @submit.prevent="handleVerifyVin">
              <div class="form-floating me-2 mb-4 w-100">
                <input
                  type="text"
                  class="form-control mb-2"
                  placeholder="name@example.com"
                  v-model="addVehicleForm.vin"
                />
                <!-- <p>{{ addVehicle.vin }}</p> -->
                <label for="Brand">VIN</label>
                <button v-if="!verifiedVin" class="button">verify</button>
                <h2 v-if="verifiedVin" class="text-center" style="color: rgb(62, 164, 253)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-check2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                    /></svg
                  >verified
                </h2>
              </div>
            </form>
            <div class="form-floating me-2">
              <input
                type="text"
                class="form-control"
                placeholder="name@example.com"
                v-model="addVehicleForm.brand"
              />
              <label for="Brand">Brand</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                placeholder="Password"
                v-model="addVehicleForm.model"
              />
              <label for="Model">Model</label>
            </div>
            <div class="form-floating mt-4 me-2">
              <input
                type="text"
                class="form-control"
                placeholder="Password"
                v-model="addVehicleForm.transMission"
              />
              <label for="Model">Transmission</label>
            </div>
            <div class="form-floating mt-4">
              <input
                type="text"
                class="form-control"
                placeholder="yearRelease"
                v-model="addVehicleForm.yearRelease"
              />
              <label for="Model">Year Release</label>
            </div>
            <div class="form-floating mt-4 me-2">
              <input
                type="text"
                class="form-control"
                placeholder="Milleage"
                v-model="addVehicleForm.milleage"
              />
              <label for="Model">Milleage</label>
            </div>
            <div class="form-floating mt-4">
              <input
                type="number"
                class="form-control"
                placeholder="Price"
                v-model="addVehicleForm.price"
              />
              <label for="Model">Price</label>
            </div>
            <div class="form-floating mt-4 me-2 w-100">
              <select v-model="addVehicleForm.TypeId" class="form-control form-select">
                <option :value="null" selected hidden>--Select type--</option>
                <option v-for="el in types" :key="el.id" :value="el.id">{{ el.name }}</option>
              </select>
            </div>
            <div class="form-floating mt-4 w-100">
              <textarea
                type="text"
                class="form-control"
                placeholder="Price"
                v-model="addVehicleForm.features"
              />
              <label for="Features">Features</label>
            </div>
            <div class="form-floating mt-4 w-100">
              <input
                type="text"
                class="form-control"
                placeholder="Price"
                v-model="addVehicleForm.currentLocation"
              />
              <label for="Condition">Current Location</label>
            </div>
            <div class="form-floating mt-4 w-100">
              <input
                type="text"
                class="form-control"
                placeholder="Price"
                v-model="addVehicleForm.condition"
              />
              <label for="Condition">Condition</label>
            </div>
            <button v-if="verifiedVin" type="submit" class="button mt-3">Sell</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>
.form-add {
  padding-top: 2%;
  padding-bottom: 3%;
  background-color: RGB(165, 227, 224);
  display: flex;
  justify-content: end;
  margin-top: 8%;
  width: 64%;
  border-bottom: 1px;
}
</style>
