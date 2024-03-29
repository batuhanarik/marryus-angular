import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { WeddingPlace } from '../models/weddingPlace';
import { WeddingPlaceImage } from '../models/weddingPlaceImage';
import { ResponseModel } from '../models/responseModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { WeddingPlaceDetailDto } from '../models/weddingPlaceDetailDto';
import { FilterOptions } from '../models/filterOptions';
import { WeddingPlaceStats } from '../models/weddingPlaceStats';

@Injectable({
  providedIn: 'root',
})
export class WeddingplaceService {
  updateWeddingPlace(weddingPlace: WeddingPlace): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(
      this.weddingPlacesUrl + '/update',
      weddingPlace
    );
  }
  weddingPlacesUrl = '/WeddingPlaces';
  weddingPlaceImagesUrl = '/WeddingPlaceImages';
  constructor(private _http: HttpClient) {}

  getWeddingplaces(): Observable<ListResponseModel<WeddingPlace>> {
    return this._http.get<ListResponseModel<WeddingPlace>>(
      this.weddingPlacesUrl + '/getall'
    );
  }

  getWeddingPlaceById(
    id: number
  ): Observable<ObjectResponseModel<WeddingPlace>> {
    return this._http.get<ObjectResponseModel<WeddingPlace>>(
      this.weddingPlacesUrl + '/getbyid?id=' + id
    );
  }

  getWeddingPlaceDetails(): Observable<
    ListResponseModel<WeddingPlaceDetailDto>
  > {
    return this._http.get<ListResponseModel<WeddingPlaceDetailDto>>(
      this.weddingPlacesUrl + '/getdetails'
    );
  }

  getWeddingPlaceDetail(
    wpId: number
  ): Observable<ObjectResponseModel<WeddingPlaceDetailDto>> {
    return this._http.get<ObjectResponseModel<WeddingPlaceDetailDto>>(
      this.weddingPlacesUrl + '/getdetailbyid?wpId=' + wpId
    );
  }

  getWeddingPlaceDetailsByCity(
    id: number
  ): Observable<ListResponseModel<WeddingPlaceDetailDto>> {
    return this._http.get<ListResponseModel<WeddingPlaceDetailDto>>(
      this.weddingPlacesUrl + '/getdetailsbycity?id=' + id
    );
  }
  getWeddingPlaceDetailsByPagination(
    page: number,
    pageSize: number
  ): Observable<ListResponseModel<WeddingPlaceDetailDto>> {
    return this._http.get<ListResponseModel<WeddingPlaceDetailDto>>(
      this.weddingPlacesUrl +
        '/getdetailsbypagination?page=' +
        page +
        '&pageSize=' +
        pageSize
    );
  }

  getDetailsByFilter(
    filterOptions: FilterOptions
  ): Observable<ListResponseModel<WeddingPlaceDetailDto>> {
    return this._http.post<ListResponseModel<WeddingPlaceDetailDto>>(
      this.weddingPlacesUrl + '/getdetailsbyfilter',
      filterOptions
    );
  }

  getWeddingPlaceImages(): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>(
      this.weddingPlaceImagesUrl + '/getall'
    );
  }
  getWeddingPlaceImagesById(
    id: number
  ): Observable<ListResponseModel<WeddingPlaceImage>> {
    return this._http.get<ListResponseModel<WeddingPlaceImage>>(
      this.weddingPlaceImagesUrl + '/getimagesbyweddingplaceid?id=' + id
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

  deleteWeddingPlace(weddingPlaceId: number): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(this.weddingPlacesUrl + '/delete', {
      weddingPlaceId: weddingPlaceId,
    });
  }

  deleteWeddingPlaceImage(image: WeddingPlaceImage): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(
      this.weddingPlaceImagesUrl + '/delete',
      image
    );
  }
  getWeddingPlaceStats(
    wpId: number
  ): Observable<ObjectResponseModel<WeddingPlaceStats>> {
    return this._http.get<ObjectResponseModel<WeddingPlaceStats>>(
      this.weddingPlacesUrl + '/getwpstats?wpId=' + wpId
    );
  }
}
