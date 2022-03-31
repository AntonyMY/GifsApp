import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey     : string   = '98pssTvGsaq4OpHpdKRGHGFJXwvw5Jk5';
  private servicioUrl: string   = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];

  //TODO: Cambiar any por su tipo correspondiente
  public resultados : Gif[]    = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultadosh')! ) || [];
    // otra forma
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }


  buscarGifs( query: string = '' ){

    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );
    }

    const params = new HttpParams()
        .set('api_key', this.apikey)
        .set('limit','10')
        .set('q', query);

    console.log(params.toString());

    //El módulo HTTP usa observables para manejar la peticiones y respuestas AJAX.
    //Un observable en angular es  modo de implementación de la programación reactiva, que básicamente pone en funcionamiento diversos actores para producir los efectos deseados, que es reaccionar ante el flujo de los distintos eventos producidos. Mejor dicho, producir dichos eventos y consumirlos de diversos modos.
    //EL subscribe se ejecuta cuando tenemos la resolución del get [del link http del get]
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( ( resp: any ) => {
        console.log( resp.data );
        this.resultados = resp.data;

        localStorage.setItem('resultadosh',JSON.stringify(this.resultados));
      })

    //console.log( this._historial );
  }

}
