package com.pruebatecnica.ip_location_services.repository;


import com.pruebatecnica.ip_location_services.entity.Ip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IpRepository extends JpaRepository<Ip, Integer> {

}
