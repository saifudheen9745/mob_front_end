import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAdminLoginPayload } from '../../services/admin-auth/admin-auth.mode';
import { Observable } from 'rxjs';
import { IApiResWithData } from '../../../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthRepository {

  private http = inject(HttpClient);

  baseUrl = environment.baseUrl

  adminDoLogin(loginPayload:IAdminLoginPayload): Observable<IApiResWithData<string>>{
    return this.http.post<IApiResWithData<string>>(`${this.baseUrl}/admin/auth/login`,loginPayload);
  }

}
