import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResWithData } from '../../../models/response.model';
import { IAdminProductList } from './admin-product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductRepository {

  private http = inject(HttpClient);
  
  baseUrl = environment.baseUrl;
  
  getAllProducts(): Observable<IApiResWithData<IAdminProductList[]>>{
    return this.http.get<IApiResWithData<IAdminProductList[]>>(`${this.baseUrl}/admin/product`);
  }
}