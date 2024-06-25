<script>
import Sidebar from "../components/sidebar.component.vue";
import OrganizationBusinessman from "../../service-execution/shipment-management/organization-businessman.component.vue";
import OrganizationView from "../../service-execution/shipment-management/organization-view.component.vue";

export default {
  name: "organization-shipment",
  components: {
    OrganizationBusinessman,
    OrganizationView,
    Sidebar
  },
}
</script>

<template>
  <div class="container">
    <sidebar></sidebar>
    <organization-businessman></organization-businessman>
  </div>
</template>

<style scoped>

</style>