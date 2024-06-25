<script>
import {ShipmentApiService} from "./services/shipment-api.service.js";
export default {
  name: "organization-businessman",
  title: "Organization Businessman",
  data() {
    return {
      shipmentsApi: new ShipmentApiService(),
      shipments: [],
      selectedShipment: null,
      shipmentDetailsDialog: false,
      addingShipmentDialogVisible: false,
      newShipment: {
        userId: "",
        destiny: "",
        description: "",
        createdAt: "",
        status: "Programmed"
      }
    };
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
    openAddShipmentDialog() {
      this.addingShipmentDialogVisible = true;
    },
    closeAddShipmentDialog() {
      this.addingShipmentDialogVisible = false;
      // Limpiar los datos del nuevo shipment al cerrar el diálogo
      this.newShipment = {
        userId: "",
        destiny: "",
        description: "",
        createdAt: "",
        status: "Programmed"
      };
    },
    async addNewShipment() {
      try {
        const response = await this.shipmentsApi.createShipment(this.newShipment);
        console.log("New shipment added:", response.data);

        // Actualizar la lista de shipments después de agregar uno nuevo
        this.getDataShipment();

        // Cerrar el diálogo de agregar shipment
        this.closeAddShipmentDialog();
      } catch (error) {
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        console.error("Error adding new shipment:", error);
      }
    }
  },
  created() {
    this.getDataShipment();
  }
};
</script>

<template>
  <div class="container z-1 header container-shipment">
    <div class="text-100 font-medium text-xl container-info">
      <h1 class="text-100">Organization</h1>
      <h3>Click in the list to see details</h3>
    </div>
    <div class="add-shipment-button">
      <pv-button label="Add Shipment" @click="openAddShipmentDialog" icon="pi pi-plus" />
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

  <pv-dialog v-model:visible="addingShipmentDialogVisible" :style="{width: '450px'}" header="Add Shipment" :modal="true" class="p-fluid dialog-style">
    <div class="field">
      <p>User ID:</p>
      <input id="userId" v-model="newShipment.userId" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Destiny</p>
      <input id="destiny" v-model="newShipment.destiny" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Description</p>
      <input id="description" type="text" v-model="newShipment.description" class="p-inputtext"/>
    </div>
    <div class="field">
      <p>Delivery date</p>
      <pv-calendar v-model="newShipment.createdAt" dateFormat="yy/mm/dd" class="calendar"/>
    </div>
    <div class="field">
      <p>Status</p>
      <input id="status" v-model="newShipment.status" disabled placeholder="Programmed" value="Programmed" class="p-inputtext"/>
    </div>

    <template #footer>
      <pv-button label="Cancel" icon="pi pi-times" @click="closeAddShipmentDialog" class="cancel-button"/>
      <pv-button label="Add" icon="pi pi-check" @click="addNewShipment" class="add-button"/>
    </template>
  </pv-dialog>
</template>

<style scoped>
.container-shipment {
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

.card-container-1 {
  margin-right: 1rem;
}

@media (max-width: 860px) {
  .container {
    margin-left: 0;
  }

  .container-info {
    margin-top: 4rem;
    margin-left: 1rem;
  }

  .card-container-1 {
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
.add-shipment-button {
  margin-top: 1rem;
}

.field{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}
.field input{
  flex-grow: 1;
}
</style>