import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {}; //info pagina es la referencia a la interface de los datos almacenados
  equipo: any = [];
  cargada = false;


  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo(){
    //leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina )=> {

        this.cargada = true;
        this.info = resp;
        console.log( resp.email );
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-ecd89-default-rtdb.firebaseio.com/equipo.json')
              .subscribe(( resp: any) =>{
                this.equipo = resp;

              })
  }
}
