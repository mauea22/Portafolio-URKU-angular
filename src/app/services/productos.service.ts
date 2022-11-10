import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise<void>((resolve, reject) => {
      this.http.get('https://angular-html-ecd89-default-rtdb.firebaseio.com/productos_idx.json')
          .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
    });
    });
  }


  getProductos( id: string){
    return this.http.get(`https://angular-html-ecd89-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }


  buscarProductos( termino: string){

    if (this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then( () => {
        //ejecuta despues de tener los productos
        //aplicar filtro
        this.filtrarProductos( termino);
      });
    } else {
      //Aplicar filtro
      this.filtrarProductos( termino);
    }
  }

  private filtrarProductos( termino: string) {
    this.productosFiltrados = [];
    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo?.toLocaleLowerCase();

      if (prod.categoria!.indexOf( termino) >= 0 || tituloLower!.indexOf( termino) >= 0) {
        this.productosFiltrados.push( prod );
      }
    })
  }

}
