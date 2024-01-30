import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const BaseUrl = 'http://localhost:3005'
export const useVehicleStore = defineStore('vehicle', {
  state: () => {
    return {
      vehicleHome: '',
      vehicleDetail: '',
      createdUserVehicle: '',
      types: '',
      verifiedVin: ''
    
    }
  },
  actions: {
    kmFormat(distance) {
      if (distance >= 1000) {
        return Math.round(distance / 1000.0) + " km"
      } else if (distance >= 100) {
        return Math.round(distance) + " m"
      }
    },

    formatCurrencies(price) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumSignificantDigits: 3,
      }).format(price)
    },
    async fetchVehicle() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BaseUrl}/vehicle`,
        })

        this.vehicleHome = data
        localStorage.removeItem("imgUrl")
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchDetailVehicle(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BaseUrl}/vehicle/${id}`
        })
        this.vehicleDetail = data
        this.createdUserVehicle = data.User
      } catch (err) {
        console.log(err);
      }
    },
    async fetchType() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BaseUrl}/type`
        })
        this.types = data
      } catch (err) {
        console.log(err);
      }
    },

    async verifyVin(vin) {
      try {
        console.log(vin);
        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/vehicle/verify-vin`,
          data: {
            vin: vin
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        console.log(data.data.vin);
        if (data.data.vin) {
          this.verifiedVin = true
        } else if (data.error) {
          this.verifiedVin = false
        }
      } catch (err){
        console.log(err);
      }
    },
    async addVehicle(form) {
      try {
        const dataAddVehicle = {
          vin : form.vin,
          brand : form.brand,
          imgUrl : form.imgUrl || localStorage.getItem("imgUrl"),
          model : form.model,
          transMission : form.transMission,
          yearRelease : form.yearRelease,
          milleage : form.milleage,
          price : form.price,
          TypeId: form.TypeId,
          features : form.features,
          currentLocation : form.currentLocation,
          condition : form.condition
        }
        console.log(dataAddVehicle);
        
        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/vehicle`,
          data: dataAddVehicle,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.router.push('/')
        
        this.verifiedVin = false
        this.fetchVehicle()
      } catch (err){
        console.log(err);
      }
    }
  }
})