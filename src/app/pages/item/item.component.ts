import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto!: ProductoDescripcion;
  id:string | undefined;


  constructor( private route: ActivatedRoute,
    public productoService: ProductosService,
    public equipoService: InfoPaginaService ) { }

    ngOnInit(): void {

    this.route.params.subscribe( parametros => {

        this.productoService.getProductos(parametros["id"]).subscribe( (producto: ProductoDescripcion) => {

          console.log(producto);
          this.id = parametros['id'];
          this.producto = producto;
        })
      })
  }

}
