import ApiService from "./ApiService";


const Fonction_API_BASE_URL = '/fonctions';
 
class FonctionService {

    getFonction(Fonctionid) {
        return ApiService.getAll(Fonction_API_BASE_URL + "/" + Fonctionid);
    }
    
    getAllFonction( ) {
        return ApiService.getAll(Fonction_API_BASE_URL);
    }
  
    delete(Id) {
        return ApiService.deleteById(Fonction_API_BASE_URL + '/' + Id);
    }

    add(Fonction) {
        return ApiService.post(Fonction_API_BASE_URL, Fonction);
    }

    
}

export default new FonctionService();