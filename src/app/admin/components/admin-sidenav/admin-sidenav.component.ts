import { Component, OnInit, inject } from '@angular/core';
import { adminSidenavItems } from './admin-sidnav.data';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IAdminSideNavItems } from './admin-sidenav.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  standalone:true,
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
  imports:[NgOptimizedImage,CommonModule]
})
export class AdminSidenavComponent implements OnInit {

  private router = inject(Router);
  private localStorageService = inject(LocalStorageService);

  sidenavItems:IAdminSideNavItems[] = adminSidenavItems;

  ngOnInit() {
  }

  sideNavActionBtn(btnOptions:IAdminSideNavItems){
    if(btnOptions.id === 'logout'){
      this.logout();
      return;
    }
    if(btnOptions.route){
      this.router.navigate([btnOptions.route]);
    }
  }

  logout(){
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/admin/login'])
  }

}
