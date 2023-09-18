import ApiService from "./ApiService";


const Service_API_BASE_URL = '/services';
 
class ServiceService {

    getService(Serviceid) {
        return ApiService.getAll(Service_API_BASE_URL + "/" + Serviceid);
    }
    
    getAllService( ) {
        return ApiService.getAll(Service_API_BASE_URL);
    }
  
    delete(Id) {
        return ApiService.deleteById(Service_API_BASE_URL + '/' + Id);
    }

    add(Service) {
        return ApiService.post(Service_API_BASE_URL, Service);
    }

    
}

export default new ServiceService();