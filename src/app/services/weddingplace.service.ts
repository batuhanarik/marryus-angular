import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WeddingPlace } from '../models/weddingPlace';
import { WeddingPlaceImage } from '../models/weddingPlaceImage';
import { ResponseModel } from '../models/responseModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { WeddingPlaceDetailDto } from '../models/weddingPlaceDetailDto';

@Injectable({
  providedIn: 'root',
})
export class WeddingplaceService {
  weddingPlacesUrl = '/WeddingPlaces';
  weddingPlaceImagesUrl = '/WeddingPlaceImages';
  constructor(private _http: HttpClient) {}

  getWeddingplaces(): Observable<ListResponseModel<WeddingPlace>> {
    return this._http.get<ListResponseModel<WeddingPlace>>(
      this.weddingPlacesUrl + '/getall'
    );
  }

  getWeddingPlaceDetails(): Observable<
    ListResponseModel<WeddingPlaceDetailDto>
  > {
    return this._http.get<ListResponseModel<WeddingPlaceDetailDto>>(
      this.weddingPlacesUrl + '/getdetails'
    );
  }

  getWeddingPlaceImages(): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>(
      this.weddingPlaceImagesUrl + '/getall'
    );
  }
  getWeddingPlaceImagesById(): Observable<
    ListResponseModel<WeddingPlaceImage>
  > {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>(
      this.weddingPlaceImagesUrl + '/getimagesbywpid'
    );
  }
  addWeddingPlace(
    weddingPlace: WeddingPlace
  ): Observable<ObjectResponseModel<number>> {
    return this._http.post<ObjectResponseModel<number>>(
      this.weddingPlacesUrl + '/add',
      weddingPlace
    );
  }
  addWeddingPlaceImages(
    images: File[],
    weddingPlaceId: number
  ): Observable<ResponseModel> {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('weddingPlaceId', weddingPlaceId.toString());
    return this._http.post<ResponseModel>(
      this.weddingPlaceImagesUrl + '/AddMultiple',
      formData
    );
  }
}
