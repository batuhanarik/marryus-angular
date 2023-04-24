import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WeddingPlace } from '../models/weddingPlace';
import { WeddingPlaceImage } from '../models/weddingPlaceImage';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class WeddingplaceService {
  constructor(private _http: HttpClient) {}

  getWeddingplaces(): Observable<ListResponseModel<WeddingPlace>> {
      return this._http.get<ListResponseModel<WeddingPlace>>('/WeddingPlaces/getall');
  }
  addWeddingPlace(weddingPlace:WeddingPlace):Observable<ListResponseModel<ResponseModel>>{
    return this._http.post<ListResponseModel<ResponseModel>>('/WeddingPlaces/add',weddingPlace);
  }
  getWeddingPlaceImages(): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>('/WeddingPlaceImages/getall');
  }
  getWeddingPlaceImagesById(): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>('/WeddingPlaceImages/getimagesbywpid');
  }
  addWeddingPlaceImage(image:any): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.post<ListResponseModel<WeddingPlaceImage>>('/WeddingPlaceImages/add',image);
  }

  
}
