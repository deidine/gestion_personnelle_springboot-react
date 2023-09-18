package deidine.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deidine.exception.ResourceNotFoundException;
import deidine.model.City;
import deidine.model.Employee;
import deidine.repository.EmployeeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;
  	@Autowired
private ModelMapper modelMapper;

	@RequestMapping("/hello")
	String hello() {
		return "helo word";
	}

	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	// create employee rest api
	@PostMapping("/employees")

	public Employee createEmployee(@RequestHeader HttpHeaders  header,@RequestBody Employee employee) {
		// return employeeRepository.save(modelMapper.map(employee,Employee.class));
		return employeeRepository.save(employee );

	}

	// get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(employee);
	}

	// update employee rest api

	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

		employee.setNom(employeeDetails.getNom());
		employee.setEmail(employeeDetails.getEmail());
		employee.setDate_emboche(employeeDetails.getDate_emboche());
		employee.setFonction(employeeDetails.getFonction());
		employee.setGrade(employeeDetails.getGrade());
		employee.setMatricule(employeeDetails.getMatricule());
		employee.setRange(employeeDetails.getRange());
		employee.setDate_naissence(employeeDetails.getDate_naissence());
		employee.setGender(employeeDetails.getGender());
		employee.setCity(employeeDetails.getCity());	
			employee.setServiceDepartment(employeeDetails.getServiceDepartment());
		employee.setFonction(employeeDetails.getFonction());

		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}

	// delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


		@GetMapping("/cities")
	public ResponseEntity<List<City>> getAllCities() {
		System.out.println("deidn "+Arrays.asList(City.values()));
		return ResponseEntity.ok(Arrays.asList(City.values()));
	}
}
