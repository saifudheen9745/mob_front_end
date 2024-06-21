import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const localStoragesService = inject(LocalStorageService);
  const router = inject(Router);

  const appToken = localStoragesService.getItem('adminToken');

  // To prevent going back to login page once loggedIn in admin
  let role = next.data['role'] as string;
  if(role === 'checkIsLoggedIn'){
    if(!appToken){
      return true
    }else{
      return false;
    }
  }

  // To prevent accessing the module if not loggedIn
  if (!appToken) {
    router.navigate(['/admin/login']);
    return false;
  }
  return true;
};
