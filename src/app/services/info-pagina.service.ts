import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {}; //info pagina es la referencia a la interface de los datos almacenados
  cargada = false;


  constructor( private http: HttpClient) { 
    //leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina )=> {
        
        this.cargada = true;
        this.info = resp;
        console.log( resp.email );
      });

  }
}
