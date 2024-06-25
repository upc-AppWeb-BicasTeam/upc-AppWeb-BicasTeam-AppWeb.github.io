import http from "../../../shared/services/http-common.js";

export class ShipmentApiService{
    createShipment(jsonShipment){
        return http.post('/shipment', jsonShipment)
    }
    getShipmentById(id){
        return http.get(`/shipment/${id}`);
    }
    getShipmentByUserId(userId){
        return http.get(`/shipment/users/${userId}`);
    }
    getAllShipments(){
        return http.get('/shipment')
    }
    findUserByID(id){
        return http.get(`/profile/${id}`)
    }
}