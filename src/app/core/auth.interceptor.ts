import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {

  const excludedUrls = ['/admin/login']

  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  const headerWithAdminToken = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorageService.getItem('adminToken')}`
  };

  const headerWithUserToken = {
    Accept: 'application/json',
    Authorization: `Bearer ${localStorageService.getItem('userToken')}`
  };

  const clonedReq = req.clone({
    setHeaders: req.url.includes('admin') ? headerWithAdminToken : headerWithUserToken
  })
  

  return next(excludedUrls.includes(router.url) ? req : clonedReq).pipe(
    tap(
      (response) => {},
      (error: HttpErrorResponse) => {
        
      },
    ),
  );
}
