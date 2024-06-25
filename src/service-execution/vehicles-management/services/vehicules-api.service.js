import http from "../../../shared/services/http-common.js";

export class VehiclesApiService{
    getAllVehicles() {
        return http.get('/vehicle');
    }
    getVehicleById(id){
        return http.get(`/vehicle/${id}`);
    }
    addVehicle(vehicle){
        return http.post("/vehicle", vehicle);
    }
    getUsers(){
        return http.get('/moviGestion-iam/users');
    }

    deleteVehicle(id){
        return http.delete(`/vehicle/${id}`);
    }

    assignVehicleToCarrier(vehicleId,carrierId){
        return http.put(`/moviGestion-cya/vehicles/${vehicleId}`,{carrierId});
    }

    getVehiclesById1(id){
        return http.get(`/vehicle/${id}`);
    }
}