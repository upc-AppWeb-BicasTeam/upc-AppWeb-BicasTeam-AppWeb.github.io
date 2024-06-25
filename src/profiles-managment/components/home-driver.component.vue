<script>
import { HomeApiService } from "../services/home-api.service.js";
import {IamApiService} from "../../iam/services/iam-api.service.js";

export default {
  name: "home-driver",
  title: "Home",
  data() {
    return {
      activities: [],
      deliveries: [],
      id: this.$route.params.id,
      api: new IamApiService(),
      name:'',
      lastName:'',
      type:'',
    };
  },
  created() {
    this.api.findUserById(this.id).then(data=>{
      this.type = data.data.type;
      this.name = data.data.name;
      this.lastName = data.data.lastName
    })
    const apiService = new HomeApiService();
    apiService.getAllActivitiesDriver().then(response => {
      this.activities = response.data;
    });

    apiService.getAllDeliveriesDriver().then(response => {
      this.deliveries = response.data;
    });
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    goToDriverReport() {
      this.$router.push(`/${this.id}/report/carrier`);
    },
    goToDriverDeliveries() {
      this.$router.push(`/${this.id}/organization/view`);
    }
  }
}
</script>

<template>
  <div class="p-grid p-dir-col z-1 container justify-content-center align-content-center">
    <div class="p-col image-title-container">
      <h1>Welcome, {{name}} {{lastName}}</h1>
      <img src="../../public/assets/logo.png" id="icon" alt="User Icon" class="img-home">
    </div>
    <div class="p-grid p-dir-col p-col card-container card-container-home-driver justify-content-center">
      <pv-card v-if="activities.length" class="p-sm-12 p-md-12 p-lg-6">
        <template #title>
          <i class="fa fa-list"></i>Today's activities
        </template>
        <template #content>
          <div v-for="activity in activities.slice(1, 4)" :key="activity.id">
            <h3>{{ activity.description }}</h3>
            <p>{{ activity.type }}</p>
            <p>{{ formatDate(activity.createdAt) }}</p>
          </div>
        </template>
        <template #footer>
          <pv-button @click="goToDriverReport">See More</pv-button>
        </template>
      </pv-card>
      <pv-card v-if="deliveries.length" class="p-sm-12 p-md-12 p-lg-6">
        <template #title>
          <i class="fa fa-truck"></i>Deliveries on the move
        </template>
        <template #content>
          <div v-for="delivery in deliveries" :key="delivery.id">
            <h3>{{ delivery.destiny }}</h3>
            <p>Package: {{ delivery.description }}</p>
            <p>Start time: {{ formatDate(delivery.createdAt) }}</p>
            <p>Delivery status: {{ delivery.status }}</p>
          </div>
        </template>
        <template #footer>
          <pv-button @click="goToDriverDeliveries">See More</pv-button>
        </template>
      </pv-card>

    </div>
  </div>
</template>

<style>
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;

}

.custom-image {
  width: 80px;
}

@media(max-width: 1024px){
  .card-container-home-driver{
    flex-direction: column;
    width: 95%;
  }
}
</style>