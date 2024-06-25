<script>
import { HomeApiService } from "../services/home-api.service.js";

export default {
  name: "home-driver",
  title: "Home",
  data() {
    return {
      activities: [],
      deliveries: [],
    };
  },
  created() {
    const apiService = new HomeApiService();
    apiService.getAllActivitiesDriver().then(response => {
      this.activities = response.data;
    });

    apiService.getAllDeliveriesDriver().then(response => {
      this.deliveries = response.data;
    });
  },
}
</script>

<template>
  <div class="p-5 flex flex-row flex-auto container z-1">
    <div>
      <div class="w-full align-content-center">
        <div class="welcome-container">
          <h1 class="title">Welcome, David Doe!</h1>
          <img src="../../public/assets/logo.png" id="icon" alt="User Icon" class="custom-image">
        </div>
        <p class="subtitle">Let's start</p>
        <div class="card-container">
          <div class="card" v-if="activities.length">
            <h2 class="card-title"><i class="fa fa-list"></i>Today's activities</h2>
            <div class="card-content">
              <div class="activity" v-for="activity in activities" :key="activity.id">
                <div class="card-content1">
                  <h3>{{ activity.description }}</h3>
                  <div class="date-time"> <!-- Añadido este div -->
                    <p>{{ activity.type }}</p>
                    <p1>{{ activity.dateTime.date }} - {{ activity.dateTime.time }}</p1>
                  </div>
                </div>
              </div>
            </div>
            <button class="see-more-button" @click="showMore">See More</button>

          </div>

          <div class="card" v-if="deliveries.length">
            <h2 class="card-title"><i class="fa fa-truck"></i>Deliveries on the move</h2>
            <div class="card-content2">
              <div class="delivery" v-for="delivery in deliveries" :key="delivery.id">
                <h3>{{ delivery.destiny }}</h3>
                <p>Responsible: {{ delivery.description }}</p>
                <p>Start time: {{ delivery.dateTime.date }}</p>
                <p>Delivery time: {{ delivery.status }}</p>
              </div>

            </div>
            <button class="see-more-button1" @click="showMore">See More</button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style>

@import 'font-awesome/css/font-awesome.min.css';
.w-full{

  margin-top: -30px;
  margin-bottom: -35px;

}

.container{


  color: #495057;
}

.flex-row{
  justify-content: flex-end;
}



.title {
  color: white;
  font-size: 45px;
  margin-top: -10px;
}



.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 40px;

}

.card {
  color: black;
  background-color: #ffff;
  border-radius: 20px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 5px;
  flex: 1;
  margin-bottom: 20px;
  width: 450px; /* Ajusta este valor a tu gusto */
  height: 450px; /* Ajusta este valor a tu gusto */
}


.card-title {
  color: black;
  font-size: 20px;
}

.card-content {

  margin-bottom: 100px;
  margin-top: -38px;
  margin-left: 60px;

}
.card-content1{

  font-size: 12px;
  color: white;
  background-color: #303841;
  border-radius: 20px;
  padding: 5px;
  width: 315px; /* Ajusta este valor a tu gusto */
  height: 54px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 19px;



}
.card-content2 {
  font-size: 10px;
  color: white;
  background-color: #303841;
  border-radius: 20px;
  margin: 5px;
  padding: 5px;
  width: 380px; /* Ajusta este valor a tu gusto */
  height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  margin-top: -5px;
  margin-left: 30px;
  text-indent: 10px;
}



.activity h3, .activity p {
  margin-top: 5px;
  margin-bottom: 5px;
}

.card-title {
  /* Añadido para mover el título un poco a la derecha */
  padding-left: 100px;
  margin-bottom: 25px;
}


h3 {
  margin-left: 12px;

}

.date-time {
  margin-top: -10px;
  margin-left: 12px;
  display: flex; /* Se utiliza flexbox para el diseño */
  gap: 1px; /* Ajusta este valor a tu gusto para modificar la separación */
}

.date-time2{

  display: flex;
  gap: 100px;
  justify-content: center;
}

.date-time p1 {

  margin-left: 100px; /* Ajusta este valor a tu gusto */
  margin-top: 6px;
}


.see-more-button {
  font-size: 14px;
  margin-top: -50px;
  margin-bottom: 18px;
  background-color: #ffcc00;
  color: white;
  border: none;
  padding: 5px 5px;
  cursor: pointer;
  margin-left: 260px;
  border-radius: 20px;
  width: 100px; /* Ajusta este valor a tu gusto */
  height: 27px;
}


.see-more-button1 {
  font-size: 14px;
  margin-top: -40px;
  margin-bottom: 5px;
  background-color: #ffcc00;
  color: white;
  border: none;
  padding: 5px 5px;
  cursor: pointer;

  margin-left: 310px;
  border-radius: 20px;
  width: 100px;
  height: 27px;
}

.custom-image {
  width: 80px; /* Ajusta el ancho según tus preferencias */
  height: auto; /* Mantener la proporción original */
  margin-left: 200px; /* Ajusta la posición horizontal */
}




.fa {
  padding-right:15px

}

</style>