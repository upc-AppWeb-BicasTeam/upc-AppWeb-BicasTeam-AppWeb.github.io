import http from "../../../shared/services/http-common.js";

export class ReportsApiService{
    findUserByID(id){
        return http.get(`/profile/${id}`)
    }
    getAllReports() {
        return http.get('/report')
    }
}