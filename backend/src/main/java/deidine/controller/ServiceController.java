package deidine.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import deidine.model.Service;
import deidine.repository.ServiceRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/")
public class ServiceController {

	@Autowired
	private ServiceRepository serviceRepository;



	// get all Services
	@GetMapping("/services")
	public List<Service> getAllServices() {
		return serviceRepository.findAll();
	}

	// create Service rest api
	@PostMapping("/services")
// @PreAuthorize("hasRole('ROLE_CLIENT')")

	public Service createService(@RequestHeader HttpHeaders  header,@RequestBody Service service) {
		return serviceRepository.save(service);
	}

	// get Service by id rest api
	@GetMapping("/services/{id}")
	public ResponseEntity<Service> getServiceById(@PathVariable Integer id) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not exist with id :" + id));
		return ResponseEntity.ok(service);
	}

	// update Service rest api

	@PutMapping("/services/{id}")
	public ResponseEntity<Service> updateService(@PathVariable Integer id, @RequestBody Service serviceDetails) {
		Service service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not exist with id :" + id));

		service.setNom(serviceDetails.getNom());
		service.setCode(serviceDetails.getCode()); 

		Service updatedService = serviceRepository.save(service);
		return ResponseEntity.ok(updatedService);
	}

	// delete Service rest api
	@DeleteMapping("/services/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteService(@PathVariable Integer id) {
		Service Service = serviceRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Service not exist with id :" + id));

		serviceRepository.delete(Service);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


	 
}
