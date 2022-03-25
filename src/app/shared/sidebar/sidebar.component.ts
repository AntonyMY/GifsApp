import { QueryFlags } from '@angular/compiler/src/render3/view/compiler';
import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor( private gifsService2: GifsService){}

  get historial2(){
    return this.gifsService2.historial;
  }

  buscar( terminogif: string){
    console.log(terminogif)
    this.gifsService2.buscarGifs(terminogif);
  }

}
