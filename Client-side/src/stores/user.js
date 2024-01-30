import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert2'

const BaseUrl = 'http://localhost:3005'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      logged: localStorage.getItem("access_token") ? true : false,
      currentUsername: '' || localStorage.getItem("userName"),
      currentPhoneNumberUser: '',
      currentCountryUser: '',
      statusOtp: ''
    }
  },
  actions: {
    async registerUser(formRegister) {
      // console.log(formRegister);
      try {
        const dataRegister = {
          firstName: formRegister.firstName,
          lastName: formRegister.lastName,
          email: formRegister.email,
          password: formRegister.password,
          phoneNumber: formRegister.phoneNumber,
          address: formRegister.address
        }
        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/user/register`,
          data: dataRegister
        })
        // console.log(data);
        this.currentPhoneNumberUser = data.phoneNumber
        this.router.push('/otp')
      } catch (err) {
        console.log(err);
      }
    },

    async loginUser(formUser) {
      try {
        const dataLogin = {
          email: formUser.email,
          password: formUser.password
        }

        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/user/login`,
          data: dataLogin
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("userName", data.user);
        this.currentUsername = data.user
        this.logged = true
        this.router.push('/')
      } catch (err) {
        console.log(err);
      }
    },

    async handleLoginGoogle(credential) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/user/glogin`,
          headers: {
            google_token: credential
          }
        })
        console.log(data.user)
        localStorage.setItem('userName', data.user.firstName)
        localStorage.setItem('access_token', data.access_token)
        this.currentUsername = data.user.firstName
        this.logged = true
        this.router.push('/')
        // this.successAlert('Success to Login Have a Great Day!')
      } catch (error) {
        console.log(error)
      }
    },

    logOutUser() {
      localStorage.clear()
      this.logged = false
    },

    async sendOtp(countryCode, phoneNumber) {
      try {
        console.log(countryCode, phoneNumber);
        const dataTosendOtp = {
          countryCode: countryCode,
          phoneNumber: phoneNumber
        }
        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/sms-otp/send-otp`,
          data: dataTosendOtp
        })
        this.statusOtp = data
        this.router.push('/verify')
        this.currentPhoneNumberUser = phoneNumber
        this.currentCountryUser = countryCode
        localStorage.setItem("countryCode", countryCode)
        localStorage.setItem("phoneNumber", phoneNumber)
      } catch (err) {
        console.log(err);
      }
    },
    async verifyOtp(otp) {
      try {
        const dataToVerify = {
          countryCode: localStorage.getItem("countryCode"),
          phoneNumber: localStorage.getItem("phoneNumber"),
          otp: otp
        }
        console.log(dataToVerify);
        const { data } = await axios({
          method: 'POST',
          url: `${BaseUrl}/sms-otp/verify-otp`,
          data: dataToVerify
        })
        console.log(data);
        this.router.push('/login')
        localStorage.removeItem("phoneNumber")
        localStorage.removeItem("countryCode")
      } catch (err) {
        console.log(err);
      }
      
    }

  
  }

})
