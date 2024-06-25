import http from "../../../shared/services/http-common.js";

export class ReportsApiService{
    findUserByID(id){
        return http.get(`/profile/${id}`)
    }
    createReport(jsonUser){
        return http.post('/report')
    }
    getAllReports() {
        return http.get('/report')
    }
}