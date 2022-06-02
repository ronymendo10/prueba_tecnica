package com.pruebatecnica.ip_location_services.service;

import com.pruebatecnica.ip_location_services.entity.Ip;
import com.pruebatecnica.ip_location_services.model.IpForm;
import com.pruebatecnica.ip_location_services.repository.IpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class IpServiceImpl implements IpService {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    IpRepository ipRepository;

    @Override
    public Ip save(Ip ip){
        return ipRepository.save(ip);
    }


    @Override
    public Boolean validateIp(IpForm ipForm) {
        Pattern pattern = Pattern.compile("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
        Matcher matcher = pattern.matcher(ipForm.getIp());
        return matcher.matches();
    }


    @Override
    @Transactional
    public List<Ip> getIpsByNombrePais(String nombre_pais) {
        String query = "FROM Ip WHERE nombre_pais = '" + nombre_pais + "'";
        List<Ip> ipList = entityManager.createQuery(query).getResultList();
            return ipList;
    }
}
