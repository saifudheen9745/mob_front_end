import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { AdminAuthRepository } from '../../repositories/admin-auth/admin-auth.repository';
import { IAdminLoginPayload } from './admin-auth.mode';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements OnDestroy{

  private adminAuthRepository = inject(AdminAuthRepository);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  subscriptions:Subscription[] = [];

  adminAuthLoaders = signal({
    adminLoginLoader:false
  });

  adminDoLogin(loginPaylod:IAdminLoginPayload){
    this.adminAuthLoaders.set({...this.adminAuthLoaders(), adminLoginLoader:true});
    this.subscriptions.push(
      this.adminAuthRepository.adminDoLogin(loginPaylod)
      .pipe(finalize(() => this.adminAuthLoaders.set({...this.adminAuthLoaders(), adminLoginLoader:false})))
      .subscribe({
        next: (res) => {
          if(res.success){
            this.localStorageService.setItem('adminToken',res.data);
            this.router.navigate(['admin/products'])
          }
        },
        error: (err) => {

        }
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
