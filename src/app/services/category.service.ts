import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<ListResponseModel<Category>> {
    return this._http.get<ListResponseModel<Category>>('/Categories/getall');
  }

  addCategory(category: Category): Observable<ListResponseModel<Category>> {
    return this._http.post<ListResponseModel<Category>>(
      '/Categories/add',
      category
    );
  }
}
