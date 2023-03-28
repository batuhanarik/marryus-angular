import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WeddingPlace } from '../models/weddingPlace';
import { WeddingPlaceImage } from '../models/weddingPlaceImage';

@Injectable({
  providedIn: 'root',
})
export class WeddingplaceService {
  constructor(private _http: HttpClient) {}

  getWeddingplaces(): Observable<ListResponseModel<WeddingPlace>> {
      return this._http.get<ListResponseModel<WeddingPlace>>('/WeddingPlaces/getall');
  }
  getWeddingPlaceImages(): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>('/WeddingPlaceImages/getall');
  }
  getWeddingPlaceImagesById(): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>('/WeddingPlaceImages/getimagesbywpid');
  }
  
}
