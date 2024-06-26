import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSidenavComponent } from '../components/admin-sidenav/admin-sidenav.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  imports:[RouterModule, AdminSidenavComponent]
})
export class AdminLayoutComponent {


}
