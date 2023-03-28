import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
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
