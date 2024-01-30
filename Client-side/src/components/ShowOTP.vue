<script>
import { mapActions, mapState, mapWritableState } from 'pinia'

import { useUserStore } from '../stores/user'
export default {
  name: "showOtp",
    data(){
    return {
      countryCode: ''
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['currentPhoneNumberUser'])
  }, 
  methods: {
    ...mapActions(useUserStore, ['sendOtp']),
    HandleVerifyUser() {
      this.sendOtp(this.countryCode, this.currentPhoneNumberUser)
      // console.log(this.countryCode, this.currentPhoneNumberUser);
    }
  }
}
</script>

<template>
  <form @submit.prevent="HandleVerifyUser" action="" class="container">
    <div class="d-flex justify-content-center" id="login-form">
      <div class="form shadow rounded">
        <div class="rounded w-75 p-4" style="background-color: rgb(185, 250, 245)">
          <h1 class="font">verify your number</h1>
          <!-- <p>{{ currentPhoneNumberUser }}</p> -->
          <!-- <p>{{ phoneNumber }}</p> -->
          <div class="input-form border-top">
            <select class="form-select mb-1" id="phone" name="phone" v-model="countryCode">
              <option value="" hidden selected>country code</option>
              <option :value="62">Indonesia +62</option>
              <option :value="44">United Kingdom +44</option>
              <option :value="1">United States +1</option>
            </select>
            <div class="form-floating">
              <input
                type="tel"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                v-model="currentPhoneNumberUser"
              />
              <label for="email">Phone Number</label>
            </div>

            <button type="submit" class="button mt-3">Verify</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>
 
</style>
