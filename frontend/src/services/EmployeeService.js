import ApiService from "./ApiService";

const Employee_API_BASE_URL = '/employees';
const CITIES = '/cities';
class EmployeeService {

    getEmployees() {
        return ApiService.getAll(Employee_API_BASE_URL);
    }

    getEmployeeById(id) {
        return ApiService.getOneById(Employee_API_BASE_URL  +"/"+ id);
    }

    // fetchEmployeeByEmail(email) {
    //     return axios.get(Employee_API_BASE_URL + '/find-by-email/' + email);
    // }

    deleteEmployee(Id) {
        return ApiService.deleteById(Employee_API_BASE_URL + '/' + Id);
    }

    addEmployee(employee) {
        return ApiService.post(Employee_API_BASE_URL, employee);
    }

    editEmployee(employee) {
        return ApiService.put(Employee_API_BASE_URL + '/' + employee.employeeid, employee);
    }
    getCities() {
        return ApiService.getAllDatas(CITIES);
    }
}

export default new EmployeeService();