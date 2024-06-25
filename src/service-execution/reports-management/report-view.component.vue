<script>
import {ReportsApiService} from "./services/reports-api.service.js";

export default {
  name: "report-view",
  title: "Report View",
  data() {
    return {
      reports: [],
      reportsApi: new ReportsApiService(),
    };
  },
  created() {
    this.getDataReport();
  },
  methods: {
    async getDataReport() {
      const response = await this.reportsApi.getAllReports();
      const reports = response.data;

      for (let report of reports) {
        const userResponse = await this.reportsApi.findUserByID(report.userId);

        if (userResponse && userResponse.data && userResponse.data.length > 0) {
          const user = userResponse.data[0];
          report.name = `${user.name} ${user.lastName}`;
        } else {
          report.name = 'Usuario no encontrado';
        }
      }
      this.reports = reports;
      console.log(this.reports);
    }
  }
}
</script>

<template>
    <div class="p-5 container z-1 header">
      <div class="text-900 font-medium text-xl mb-3">
        <h1>Reports</h1>
        <p>Driver report list</p>
      </div>
      <div class="p-5 card-container">
        <pv-card>
          <template #content>
            <pv-table :value="reports">
              <pv-column field="name" header="Driver’s Name"></pv-column>
              <pv-column field="type" header="Description"></pv-column>
              <pv-column field="createdAt" header="Date"></pv-column>
            </pv-table>
          </template>
        </pv-card>
      </div>
    </div>
</template>

<style>

.container{
  max-width: 1500px;
  margin-left: 10rem;
  color: #495057;
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 20px; /* Espacio entre el encabezado y el pv-card */
}

.card-container {
  align-self: center; /* Centrar el pv-card horizontalmente */
}
</style>