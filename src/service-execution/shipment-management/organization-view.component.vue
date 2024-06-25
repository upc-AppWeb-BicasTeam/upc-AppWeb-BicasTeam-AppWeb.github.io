<script>
import {ShipmentApiService} from "./services/shipment-api.service.js";

export default {
  name: "organization-view",
  title: "Organization View",
  data(){
    return {
      shipmentsApi: new ShipmentApiService(),
      shipments: [],
      selectedShipment: null,
      shipmentDetailsDialog: false,
    };
  },
  created(){
    this.getDataShipment();
  },
  methods: {
    async getDataShipment() {
      try {
        const response = await this.shipmentsApi.getAllShipments();
        const shipments = response.data;

        for (let shipment of shipments) {
          if (shipment.userId && shipment.userId > 0) {
            try {
              const userResponse = await this.shipmentsApi.findUserByID(shipment.userId);
              const user = userResponse.data;

              if (user) {
                shipment.driverName = `${user.name} ${user.lastName}`;
              } else {
                shipment.driverName = 'Unknown';
              }
            } catch (error) {
              console.error(`Error fetching user with ID ${shipment.userId}:`, error);
              shipment.driverName = 'Unknown';
            }
          } else {
            shipment.driverName = 'Unknown';
          }
        }

        this.shipments = shipments;
      } catch (error) {
        console.error("Error fetching shipments or user data:", error);
      }
    },
    showShipmentDetails(shipment) {
      this.selectedShipment = shipment;
      this.shipmentDetailsDialog = true;
    },
    hideShipmentDetailsDialog() {
      this.shipmentDetailsDialog = false;
    },
  }
}
</script>

<template>
  <div class="container z-1 header container-shipment">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Organization</h1>
      <h3>Click in the list to see details</h3>
    </div>
  </div>
  <div class="card-container-1">
    <pv-card>
      <template #content>
        <pv-table :value="shipments" @row-click="showShipmentDetails($event.data)">
          <pv-column field="driverName" header="Driver's Name"></pv-column>
          <pv-column field="destiny" header="Destiny"></pv-column>
          <pv-column field="description" header="Description"></pv-column>
          <pv-column field="createdAt" header="Delivery date"></pv-column>
          <pv-column field="status" header="Status"></pv-column>
        </pv-table>
      </template>
    </pv-card>
  </div>
  <pv-dialog v-model:visible="shipmentDetailsDialog" :style="{width: '450px'}" header="Shipment Details" :modal="true" class="p-fluid dialog-style">
    <div v-if="selectedShipment">
      <p>Driver's Name: {{ selectedShipment.driverName }}</p>
      <p>Destiny: {{ selectedShipment.destiny }}</p>
      <p>Description: {{ selectedShipment.description }}</p>
      <p>Delivery date: {{ selectedShipment.createdAt }}</p>
      <p>Status: {{ selectedShipment.status }}</p>
    </div>
    <template #footer>
      <pv-button label="Close" icon="pi pi-times" text @click="hideShipmentDetailsDialog" class="cancel-button"/>
    </template>
  </pv-dialog>

</template>

<style>

.container-shipment{
  display: flex !important;
  align-content: flex-start !important;
  align-items: flex-start !important;
  margin-left: 0;
}
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 11rem;
}

.card-container-1{
  margin-right: 1rem;
}

@media (max-width: 860px){
  .container{
    margin-left: 0;
  }

  .container-info{
    margin-top: 4rem;
    margin-left: 1rem;
  }

  .card-container-1{
    margin-left: 1rem;
  }
}

.dialog-style .p-dialog-content {
  background-color: #f5f5f5;
  color: #333;

}
.dialog-style .p-dialog-header {
  background-color: #007bff;
  color: whitesmoke;
}
.dialog-style .cancel-button {
  background-color: #dc3545;
  color: #fff;
}
</style>