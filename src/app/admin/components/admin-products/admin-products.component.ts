import { Component, OnInit, inject } from '@angular/core';
import { AdminProductService } from '../../services/admin-product/admin-product.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DrawerService } from '../../../shared/services/drawer-service/drawer.service';
import { AdminAddEditProductComponent } from '../drawer-component-collections/admin-add-edit-product/admin-add-edit-product.component';
import { IAdminProductList } from '../../repositories/admin-product/admin-product.model';
import { SearchPipe } from '../../../shared/pipes/search-pipe/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  imports:[NgOptimizedImage,CommonModule, AdminAddEditProductComponent, SearchPipe, FormsModule]
})
export class AdminProductsComponent implements OnInit {

  public adminProductService = inject(AdminProductService);
  private drawerService = inject(DrawerService);

  searchKey:string;

  ngOnInit() {
    if(!this.adminProductService.adminProductList().length){
      this.adminProductService.getAllProducts()
    }
  }

  createNewProduct(){
    this.drawerService.drawerComponent.next({component:'adminAddEditProduct',isUpdateMode:false});
    this.adminProductService.productToUpdate.next({} as IAdminProductList);
  }

  updateProduct(product:IAdminProductList){
    this.adminProductService.productToUpdate.next(product);
    this.drawerService.drawerComponent.next({component:'adminAddEditProduct',isUpdateMode:true});
  }

}
