import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';;
import { City } from '../models/City';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CityService {
constructor(private _http: HttpClient) {}

  getCities() : Observable<ListResponseModel<City>> {
    return this._http.get<ListResponseModel<City>>('/Cities/getall');
  }
}
