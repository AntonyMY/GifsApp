import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey    : string   = '98pssTvGsaq4OpHpdKRGHGFJXwvw5Jk5';
  private _historial: string[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient){}

  buscarGifs( query: string = '' ){

    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    //El módulo HTTP usa observables para manejar la peticiones y respuestas AJAX.
    //Un observable en angular es  modo de implementación de la programación reactiva, que básicamente pone en funcionamiento diversos actores para producir los efectos deseados, que es reaccionar ante el flujo de los distintos eventos producidos. Mejor dicho, producir dichos eventos y consumirlos de diversos modos.
    //EL subscribe se ejecuta cuando tenemos la resolución del get [del link http del get]
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=98pssTvGsaq4OpHpdKRGHGFJXwvw5Jk5&q=${ query }&limit=10`)
      .subscribe( ( resp: any ) => {
        console.log( resp.data );
      })

    //console.log( this._historial );
  }

}
