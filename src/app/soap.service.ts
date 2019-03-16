import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { parseString } from "xml2js";

@Injectable({
  providedIn: 'root'
})
export class SoapService {
  BASE_XML  = '<?xml version="1.0" encoding="utf-8"?>'
            + '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'
            + '<soap12:Body>'
            + '<CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">'
            + '<Celsius>';

  END_XML = '</Celsius>'
          + '</CelsiusToFahrenheit>'
          + '</soap12:Body>'
          + '</soap12:Envelope>';

  constructor(private http: HttpClient) { }

  sendRequest (celcius: string) {
    let request = this.BASE_XML + celcius + this.END_XML;
    console.log(request)
    return this.http.get(request)
      .pipe(map(res => {
        parseString(res, function (err, result) {
          console.log(result);
        });
        console.log(res)
      }));
  }
}
