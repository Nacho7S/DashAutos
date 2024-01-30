<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
export default {
  name: "verifyForm",
  data() {
    return {
      otpCode: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['verifyOtp']),
    verifiedUser() {
      this.verifyOtp(this.otpCode)
    }
  }
}
</script>

<template>
  <form @submit.prevent="verifiedUser" action="" class="container">
    <div class="d-flex justify-content-center" id="login-form">
      <div class="form shadow rounded">
        <div class="rounded w-75 p-4" style="background-color: rgb(185, 250, 245)">
          <h3 class="font text-center">Verify your Otp</h3>
          <div class="input-form border-top">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                v-model="otpCode"
              />
              <label for="email">Insert Otp Code Here...</label>
            </div>

            <button type="submit" class="button mt-3">Verify</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>