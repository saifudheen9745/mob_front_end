import { Component, OnInit, inject } from '@angular/core';
import { AdminProductService } from '../../services/admin-product/admin-product.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  imports:[NgOptimizedImage,CommonModule]
})
export class AdminProductsComponent implements OnInit {

  public adminProductService = inject(AdminProductService);

  ngOnInit() {
    this.adminProductService.getAllProducts()
  }

}
