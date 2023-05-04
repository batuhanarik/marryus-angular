import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ObjectResponseModel } from '../models/objectResponseModel';
import { AuthResponse } from '../models/auth.model';
import { ChangePasswordModel } from '../models/changePasswordModel';
import { UserModel } from '../models/userModel';
import { OperationClaim, UserOperationClaim } from '../models/operationClaims';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl = '/Users/';
  constructor(private _http: HttpClient) {}

  updateUser(user: UserModel): Observable<ObjectResponseModel<AuthResponse>> {
    return this._http.post<ObjectResponseModel<AuthResponse>>(
      this.usersUrl + 'update',
      user
    );
  }

  changePassword(
    changePasswordModel: ChangePasswordModel
  ): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(
      this.usersUrl + 'changepassword',
      changePasswordModel
    );
  }

  get(id: number): Observable<ObjectResponseModel<UserModel>> {
    return this._http.get<ObjectResponseModel<UserModel>>(
      this.usersUrl + 'get?id=' + id
    );
  }

  getByMail(email: string): Observable<ObjectResponseModel<UserModel>> {
    return this._http.get<ObjectResponseModel<UserModel>>(
      this.usersUrl + 'getbymail?email=' + email
    );
  }

  getUsers(): Observable<ListResponseModel<UserModel>> {
    return this._http.get<ListResponseModel<UserModel>>(
      this.usersUrl + 'getusers'
    );
  }

  getUserClaims(userId: number): Observable<ListResponseModel<OperationClaim>> {
    return this._http.get<ListResponseModel<OperationClaim>>(
      this.usersUrl + 'getuserclaims?userId=' + userId
    );
  }

  getOperationClaims(): Observable<ListResponseModel<OperationClaim>> {
    return this._http.get<ListResponseModel<OperationClaim>>(
      this.usersUrl + 'getoperationclaims'
    );
  }

  addClaim(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(
      this.usersUrl + 'addclaim',
      userOperationClaim
    );
  }

  deleteClaim(
    userOperationClaim: UserOperationClaim
  ): Observable<ResponseModel> {
    return this._http.post<ResponseModel>(
      this.usersUrl + 'deleteclaim',
      userOperationClaim
    );
  }
}
