package com.pruebatecnica.ip_location_services.controller;

import com.pruebatecnica.ip_location_services.entity.Ip;
import com.pruebatecnica.ip_location_services.exception.ApiRequestExecption;
import com.pruebatecnica.ip_location_services.model.IpForm;
import com.pruebatecnica.ip_location_services.service.IpService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

@RestController
@RequestMapping("/api")
public class IpLocationController {

    @Autowired
    private IpService ipService;




    @PostMapping("/registro/ip")
    public ResponseEntity<Ip> registryIp(@RequestBody IpForm ipForm) throws IOException, JSONException {
        if(ipService.validateIp(ipForm)){
            String apiUrl = "http://api.ipapi.com/api/"+ipForm.getIp()+"?access_key=99ce4613eccb821ef3647ccff121f597";
                URL url = new URL(apiUrl);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.connect();
                int responseCode =  conn.getResponseCode();
                if (responseCode != 200){
                    throw new ApiRequestExecption("Ocurrio un error: " + responseCode);
                }else{
                    StringBuilder stringBuilder = new StringBuilder();
                    Scanner scanner = new Scanner(url.openStream());
                    while (scanner.hasNext()){
                        stringBuilder.append(scanner.nextLine());
                    }
                    scanner.close();
                    JSONObject jsonObject = new JSONObject(stringBuilder.toString());
                    Ip ip = new Ip();
                    ip.setCod_iso(jsonObject.getString("country_code"));
                    ip.setNombre_pais(jsonObject.getString("country_name"));
                    ip.setHora_consulta(LocalDateTime.now());
                    ip.setIp(ipForm.getIp());
                    return ResponseEntity.ok(ipService.save(ip));
                }
        }else{
            throw new ApiRequestExecption("La IP no es valida");
        }

    }


    @GetMapping("/consulta/{nombre_pais}")
    public ResponseEntity<List>getIpByNombrePais(@PathVariable ("nombre_pais") String nombre_pais) {
        return ResponseEntity.ok(ipService.getIpsByNombrePais(nombre_pais));
    }
}
