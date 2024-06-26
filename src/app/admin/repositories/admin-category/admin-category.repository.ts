import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAdminLoginPayload } from '../../services/admin-auth/admin-auth.mode';
import { Observable } from 'rxjs';
import { IApiResWithData } from '../../../models/response.model';
import { IAdminCategoryList } from './admin-category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryRepository {

  private http = inject(HttpClient);
  
  baseUrl = environment.baseUrl;
  
  getAllCategories(): Observable<IApiResWithData<IAdminCategoryList[]>>{
    return this.http.get<IApiResWithData<IAdminCategoryList[]>>(`${this.baseUrl}/admin/category`);
  }
}