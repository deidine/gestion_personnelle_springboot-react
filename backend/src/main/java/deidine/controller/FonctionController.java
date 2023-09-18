package deidine.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deidine.exception.ResourceNotFoundException;
 import deidine.model.Fonction;
import deidine.repository.FonctionRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/")
public class FonctionController {

	@Autowired
	private FonctionRepository fonctionRepository;

 

	// get all Fonctions
	@GetMapping("/fonctions")
	public List<Fonction> getAllFonctions() {
		return fonctionRepository.findAll();
	}

	// create Fonction rest api
	@PostMapping("/fonctions")
	public Fonction createFonction(@RequestBody Fonction Fonction) {
		return fonctionRepository.save(Fonction);
	}

	// get Fonction by id rest api
	@GetMapping("/fonctions/{id}")
	public ResponseEntity<Fonction> getFonctionById(@PathVariable Integer id) {
		Fonction Fonction = fonctionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Fonction not exist with id :" + id));
		return ResponseEntity.ok(Fonction);
	}

	// update Fonction rest api

	@PutMapping("/fonctions/{id}")
	public ResponseEntity<Fonction> updateFonction(@PathVariable Integer id, @RequestBody Fonction FonctionDetails) {
		Fonction Fonction = fonctionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Fonction not exist with id :" + id));

		Fonction.setNom(FonctionDetails.getNom());
		Fonction.setCode(FonctionDetails.getCode()); 

		Fonction updatedFonction = fonctionRepository.save(Fonction);
		return ResponseEntity.ok(updatedFonction);
	}

	// delete Fonction rest api
	@DeleteMapping("/fonctions/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteFonction(@PathVariable Integer id) {
		Fonction Fonction = fonctionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Fonction not exist with id :" + id));

		fonctionRepository.delete(Fonction);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


	 
}
