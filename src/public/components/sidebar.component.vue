<script>
import { ProfileApiService } from "../../profiles-managment/services/profile-api.service.js";
import {IamApiService} from "../../iam/services/iam-api.service.js";

export default {
  name: "sidebar",
  data() {
    return {
      name:'',
      lastName:'',
      type:'',
      visible: true,
      id: this.$route.params.id,
      api: new IamApiService()
    };
  },
  created() {
    this.api.findUserById(this.id).then(data=>{
      this.type = data.data[0].type;
      this.name = data.data[0].name;
      this.lastName = data.data[0].lastName
    })
  },
  methods:{
    goToHome(){
      if(this.type === "businessman"){
        this.$router.push(`/${this.id}/home-businessman-menu`)
      }else{
        this.$router.push(`/${this.id}/home-driver-menu`)
      }
    },
    goToProfile(){
      this.$router.push(`/${this.id}/userprofile`)
    },
    goToVehicles(){
      if(this.type === "businessman"){
        this.$router.push(`/${this.id}/vehicles-businessman`)
      }else{
        this.$router.push(`/${this.id}/vehicles-carrier`)
      }
    },
    goToReports(){
      if(this.type === "businessman"){
        this.$router.push(`/${this.id}/report/businessman`)
      }else{
        this.$router.push(`/${this.id}/report/carrier`)
      }
    },
    goToOrganizations(){
      if(this.type === "businessman"){
        this.$router.push(`/${this.id}/organization`)
      }else{
        this.$router.push(`/${this.id}/organization/view`)
      }
    }
  }
}
</script>

<template>
    <pv-sidebar visible="visible" :showCloseIcon="false" :showHeader="false">
      <div class="flex flex-column align-items-left h-full justify-content-around z-">
        <div @click="goToProfile" class="flex justify-content-center align-items-center mr-6 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
          <img src="https://www.capitalcoahuila.com.mx/wp-content/uploads/2022/11/CARL-e1669117013260.jpeg" id="icon" alt="User Icon" class="custom-image"size=" xlarge" shape="circle">
          <a  class="m-2">
            <h2>{{name}}</h2>
            <h2>{{lastName}}</h2>
            <h3>{{type}}</h3>
          </a>
        </div>
        <div>
          <ul class="list-none p-3 m-0">
            <li @click="goToHome">
              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-home mr-2 text-xl"></i>
                <span class="font-medium text-xl">Home</span>
              </a>
            </li>
            <li @click="goToOrganizations">
              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-users mr-2 text-xl"></i>
                <span class="font-medium text-xl">Organization</span>
              </a>
            </li>
            <li @click="goToReports">
              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-chart-bar mr-2 text-xl"></i>
                <span class="font-medium text-xl">Reports</span>
              </a>
            </li>
            <li @click="goToVehicles">
              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-truck mr-2 text-xl"></i>
                <span class="font-medium text-xl">Vehicles</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul class="list-none p-3 m-0">
            <li @click="goToProfile">
              <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                <i class="pi pi-cog mr-2 text-xl"></i>
                <span class="font-medium text-xl">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </pv-sidebar>
</template>

<style>
.p-sidebar-header{
  display:none;
}

.p-sidebar{
  background-color: #303841;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

}

.p-sidebar-mask{
  z-index: 0 !important;
}
body{
  background-color: #5D6D7E;
}
.custom-image {
  border-radius: 50%;
}


.mr-6
{
  margin-right: 2px;



}

.custom-image {
  border-radius: 50%;
  margin-left: 0 !important;
}

</style>