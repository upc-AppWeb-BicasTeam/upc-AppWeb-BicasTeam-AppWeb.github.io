<script>
import Sidebar from "../components/sidebar.component.vue";
import OrganizationViewComponent from "../../service-execution/shipment-management/organization-businessman.component.vue";
import OrganizationView from "../../service-execution/shipment-management/organization-view.component.vue";

export default {
  name: "carrier-shipment",
  components: {
    OrganizationView,
    Sidebar
  },
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <organization-view></organization-view>
  </div>
</template>

<style>
.container{
  display: flex;
}
</style>