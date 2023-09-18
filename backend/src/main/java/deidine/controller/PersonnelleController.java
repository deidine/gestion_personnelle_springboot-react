package deidine.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import deidine.model.Department;
import deidine.model.Personnelle;
import deidine.exception.ResourceNotFoundException;
import deidine.factory.PersonnelleFactory;
import deidine.service.IPersonnelleService;

import java.util.List;

/***
 * Personnelle.java
 * 
 * @author Elvis Ndlangamandla (213063964)
 *         Date: 21 August 2022
 */

@RestController
@CrossOrigin(origins = "http://localhost:3000")

@RequestMapping("api/personnelle")
@Slf4j
public class PersonnelleController {

    private final IPersonnelleService personnelleService;

    @Autowired
    public PersonnelleController(IPersonnelleService personnelleService) {
        this.personnelleService = personnelleService;
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Personnelle> updateDepartment(@PathVariable Long id,
            @RequestBody Personnelle personnelleDetails) {
    Personnelle personnelle = this.personnelleService.read(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personnelle not exist with id :" + id));
personnelle.setEmail(personnelleDetails.getEmail());
personnelle.setFn_dans_entite(personnelleDetails.getFn_dans_entite());
personnelle.setId_bur(personnelleDetails.getId_bur());
personnelle.setNom(personnelleDetails.getNom());
personnelle.setTelephone(personnelleDetails.getTelephone());
personnelle.setRole_systm(personnelleDetails.getRole_systm());
        Personnelle updatedPersonnelle = personnelleService.save(personnelle);
        return ResponseEntity.ok(updatedPersonnelle);
    }

    @PostMapping("save")
    public ResponseEntity<Personnelle> save(@RequestBody Personnelle personnelle) {
        log.info("Save Request: ", personnelle);

        Personnelle ValidatePersonnelle;
        try {
            ValidatePersonnelle = PersonnelleFactory.createPersonnelle(personnelle.getEmail(),
                    personnelle.getFn_dans_entite(), personnelle.getId_bur(),
                     personnelle.getNom(),
                    personnelle.getRole_systm(), personnelle.getTelephone()
            // ,Personnelle.getFaculty()
            );
        } catch (IllegalArgumentException i) {
            log.info("Save error: ", i.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        Personnelle save = personnelleService.save(ValidatePersonnelle);
        return ResponseEntity.ok(save);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Personnelle> read(@PathVariable Long id) {
    log.info("Read Request: ", id);
    Personnelle Personnelle = this.personnelleService.read(id)
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    return ResponseEntity.ok(Personnelle);
    }

    @GetMapping("find-all")
    // @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<List<Personnelle>> findAll() {
        List<Personnelle> personnelleLists = this.personnelleService.findAll();
        return ResponseEntity.ok(personnelleLists);
    }

 

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Delete Req: ", id);
        this.personnelleService.deleteById(id);
        return ResponseEntity.noContent().build();
    } 
}
