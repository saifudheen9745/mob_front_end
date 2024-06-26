import { Component, OnInit, inject } from '@angular/core';
import { AdminProductService } from '../../services/admin-product/admin-product.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DrawerService } from '../../../shared/services/drawer-service/drawer.service';

@Component({
  standalone:true,
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  imports:[NgOptimizedImage,CommonModule]
})
export class AdminProductsComponent implements OnInit {

  public adminProductService = inject(AdminProductService);
  private drawerService = inject(DrawerService);

  ngOnInit() {
    this.adminProductService.getAllProducts()
  }

  createNewProduct(){
    this.drawerService.drawerComponent.next('adminAddEditProduct');
  }

}
