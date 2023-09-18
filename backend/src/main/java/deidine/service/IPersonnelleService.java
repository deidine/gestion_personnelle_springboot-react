package deidine.service;

/*
author: Ameer Ismail
student nr: 218216033
Service interface: IStudentService
ADP 3 Assignment Group1
Service implementation
*/

import deidine.model.Personnelle;
import deidine.service.IService;

public interface IPersonnelleService extends IService<Personnelle, Long>
{
    void deleteById(Long id);
}
