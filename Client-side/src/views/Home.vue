<script>
import { mapActions, mapState } from 'pinia'
import {useVehicleStore} from '../stores/vehicle'
export default {
  name: "HomePage",
  computed: {
    ...mapState(useVehicleStore, ['vehicleHome'])
  },
  methods: {
    ...mapActions(useVehicleStore, ['fetchVehicle']),
    toDetails(id) {
      this.$router.push(`/vehicle/${id}`)
    },
    toAddForm() {
    this.$router.push('/vehicle/add')
  }
  }, 
  created() {
    this.fetchVehicle()
  },
}
</script>

<template>
  <section id="hover-img">
  <div class="container py-5 mt-5">
    <div class="row">
      <div @click.prevent="toDetails(el.id)" class="col-xs-12 col-md-6 col-lg-4 mb-4 mb-lg-0" v-for="el in vehicleHome" :key="el.id">
        <div class="card overflow-hidden mb-4">
          <img  :src="el.imgUrl" class="img-fluid" alt="Loading">
          <div class="card-body">
            <h5 class="card-title mt-3"><a href="#" class="text-decoration-none text-dark">{{ el.yearRelease }} {{ el.brand }} {{ el.model }}</a></h5>
            <h6 class="card-title mt-3"><a href="#" class="text-decoration-none text-dark">{{ el.transMission }} {{ el.features }}</a></h6>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-muted"><i class="fa fa-user mr-1" aria-hidden="true"></i>
              {{ el.currentLocation }}
              <span class="float-right"><i class="fa fa-calendar mr-1" aria-hidden="true"></i>
                {{ el.createdAt }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
  <div id="button-sell">
    <div>
      <button @click.prevent="toAddForm" class="sellCar">Sell a Car</button>
    </div>
  </div>
</template>

<style>
  .sellCar {
  background-color : #31B0D5;
  color: white;
  padding: 10px 20px;
  width: 150%;
  height: 65px;
  border-radius: 15px;
  border-color:  #a4e7fb;
}

#button-sell {
  position: fixed;
  bottom: 89px;
  right: 90px;
}

.sellCar:hover{
  background-color: #a4e7fb;
  color: black;
  border-color:   #31B0D5;
}

.card:hover {
transform: scale(1.09); 
border-color: black;
transition: .4s ease-in-out;
}
</style>
