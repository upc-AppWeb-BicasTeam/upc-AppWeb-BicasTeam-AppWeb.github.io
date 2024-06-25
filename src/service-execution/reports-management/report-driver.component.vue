<script>
import {ReportsApiService} from "./services/reports-api.service.js";

export default {
  name: "report-driver",
  title: "Report Driver",
  data(){
    return {
      reports: null,
      report: null,
      name : "",
      description : "",
      reportsApi: new ReportsApiService(),
      submitted: false,
      reportDialog: false,
    };
  },
  created(){
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
    },
    openNew(){
      this.report = {};
      this.submitted = false;
      this.reportDialog = true;
    },
    hideDialog(){
      this.reportDialog = false;
      this.submitted = false;
    },
    saveReport(){
      let json = {
        name: "Peter Castle",
        type:"infringement",
        description: this.description,
        date: new Date().toISOString().split('T')[0],
      };
      this.reportsApi.createReport(json).then((data) => {
        console.log(data);
      });
      if (!this.report.description) {
        this.submitted = true;
        return;
      }
      this.reportDialog= false;
      this.submitted = true;
    }
  }
}
</script>

<template>
  <div class="flex justify-content-between flex-wrap container">
    <div class="text-900 font-medium text-xl mb-3">
    <h1>Reports</h1>
    <p>Driver report list</p>
    </div>
    <div class="flex align-items-center justify-content-center">
    <pv-button label="New" icon="pi pi-plus" severity="success" class="mr-5" @click="openNew"/>
    </div>
  </div>
  <div class="p-5 card-container">
    <!--CARD-TABLE-->
    <pv-card>
      <template #content>
        <pv-table :value="reports">
          <pv-column field="name" header="Driver’s Name"></pv-column>
          <pv-column field="type" header="Description"></pv-column>
          <pv-column field="createdAt" header="Date"></pv-column>
        </pv-table>
      </template>
    </pv-card>
    <!--FIN - CARD - TABLE-->

    <!--REPORT-DIALOG START-->
    <pv-dialog v-model:visible="reportDialog" :style="{width: '450px'}" header="Report Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" v-model="description" required="true" rows="3" cols="20" class="p-inputtext" />
        <small class="p-error" v-if="submitted && !report.description">Description is required.</small>
      </div>

      <template #footer>
        <pv-button label="Cancel" icon="pi pi-times" text @click="hideDialog" class="p-button-footer"/>
        <pv-button label="Save" icon="pi pi-check" text @click="saveReport" class="p-button-footer"/>
      </template>
    </pv-dialog>
    <!--REPORT-DIALOG END-->
  </div>
</template>

<style>
.field label {
  font-weight: bold;
  color: #333;
}
.p-inputtext {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
}
.p-button-footer {
  background-color: #ddd;
  color: #333;
  border: none;
}
.card-container {
  align-self: center;
}
</style>