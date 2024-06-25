import http from "../../shared/services/http-common.js";

export class HomeApiService {

    getAllActivities() {
        return http.get('/report')
    }
    getAllCondition() {
        return http.get('/vehicle');
    }
    getAllDeliveries() {
        return http.get('/shipment');
    }
    getAllActivitiesDriver() {
        return http.get('/report');
    }
    getAllDeliveriesDriver() {
        return http.get('/shipment');
    }
}