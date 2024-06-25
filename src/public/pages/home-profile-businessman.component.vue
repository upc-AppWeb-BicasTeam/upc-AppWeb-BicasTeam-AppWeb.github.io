
<script>
import Sidebar from "../components/sidebar.component.vue";
import HomeBusinessman from "../../profiles-managment/components/home-businessman.component.vue";


export default {
  name: "Businessman-Profile",
  components: {
    HomeBusinessman,
    Sidebar


  },
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <home-businessman/>
  </div>
</template>

<style>
.container{
  display: flex;
}
</style>