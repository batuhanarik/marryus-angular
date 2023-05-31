import { Injectable } from '@angular/core';
import { Rental } from '../models/rental';
import { CreditCard } from '../models/creditCard';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  rentalsUrl = '/Rentals/';
  constructor(private _http: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetailDto>> {
    return this._http.get<ListResponseModel<RentalDetailDto>>(
      this.rentalsUrl + 'getdetails'
    );
  }
  getOccupiedDates(wpId: number): Observable<ListResponseModel<Date>> {
    return this._http.get<ListResponseModel<Date>>(
      this.rentalsUrl + 'getoccupieddates?wpId=' + wpId
    );
  }

  rent(rental: Rental, creditCard: CreditCard): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(this.rentalsUrl + 'add', {
      rental,
      creditCard,
    });
  }
}
