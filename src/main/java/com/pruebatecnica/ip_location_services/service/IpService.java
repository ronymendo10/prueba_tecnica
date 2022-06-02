package com.pruebatecnica.ip_location_services.service;

import com.pruebatecnica.ip_location_services.entity.Ip;
import com.pruebatecnica.ip_location_services.model.IpForm;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IpService {
    Ip save(Ip ip);


    Boolean validateIp(IpForm ipForm);

    @Transactional
    List<Ip> getIpsByNombrePais(String nombre_pais);
}
