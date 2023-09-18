import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../constants/constants';

 
let reqInstance = axios.create({
    headers: {
      Authorization : 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
    //   Authorization : `Bearer ${localStorage.getItem("accessToken")}`
      },
    'Content-Type': 'application/json',
  });

class ApiService {

    getAllDatas(url) {
        return reqInstance.get(API_BASE_URL + url,
    );
    }
    getAll(url) {
        return reqInstance.get(API_BASE_URL + url);
    }
    getOneById(url) {
        return reqInstance.get(API_BASE_URL + url);
    }

    // fetchPatientByEmail(email) {
    //     return reqInstance.get(USER_API_BASE_URL + '/find-by-email/' + email);
    // }

    deleteById(url) {
        return reqInstance.delete(API_BASE_URL + url);
    }

    post(url, data) {
        return reqInstance.post(API_BASE_URL + url, data);
    }

    put(url, data) {
        return reqInstance.put(API_BASE_URL + url, data);
    }

}

export default new ApiService();