import http from "../../shared/services/http-common.js";

export class ProfileApiService {
    updateUser(id, jsonUser) {
        return http.put(`/profile/${id}`, jsonUser);
    }
}