import http from "../../shared/services/http-common.js";

export class IamApiService{
    createUser(jsonUser){
        return http.post('/profile', jsonUser)
    }
    findUserById(id){
        return http.get(`/profile/${id}`);
    }
    findUserWithEmailAndPassword(email, password){
        return http.get(`/profile/email/${email}/password/${password}`);
    }
    findUserWithEmail(email){
        return http.get(`/profile/email/${email}`);
    }
}