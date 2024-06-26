import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AdminProductRepository } from '../../repositories/admin-product/admin-product.repository';
import { IAdminProductCreateFormData, IAdminProductList } from '../../repositories/admin-product/admin-product.model';
import { FormGroup } from '@angular/forms';
import { DrawerService } from '../../../shared/services/drawer-service/drawer.service';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService implements OnDestroy{

  private adminProductRepository = inject(AdminProductRepository);
  private drawerService = inject(DrawerService);
  
  public adminProductList = signal<IAdminProductList[]>([]);
  private subscriptions:Subscription[] = [];
  public productToUpdate = new BehaviorSubject<IAdminProductList>({} as IAdminProductList);


  getAllProducts(){
    this.subscriptions.push(
      this.adminProductRepository.getAllProducts().subscribe({
        next:(res) => {
          if(res.success){
            this.adminProductList.set(res.data);
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

  createProduct(image:File,formData:IAdminProductCreateFormData){
    const data = new FormData()
    data.append("image",image,image?.name);
    data.append("name", formData.name);
    data.append("description",formData.description)
    data.append("price",formData.price);
    data.append("disabled",formData.disabled.toString())
    data.append("category",formData.category as string);
    data.append("quantity",formData.quantity)
    this.subscriptions.push(
      this.adminProductRepository.createProduct(data).subscribe({
        next:(res) => {
          if(res.success){
            this.adminProductList.set([...this.adminProductList(),res.data[0]]);
            this.drawerService.drawerToggle.next(false);
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

  updateProduct(image:File,formData:IAdminProductCreateFormData,productId:number){
    const data = new FormData()
    if(image != null){
      data.append("image",image,image?.name);
    }
    data.append("id", productId.toString());
    data.append("name", formData.name);
    data.append("description",formData.description)
    data.append("price",formData.price);
    data.append("disabled",formData.disabled.toString())
    data.append("category",formData.category as string);
    data.append("quantity",formData.quantity)
    this.subscriptions.push(
      this.adminProductRepository.updateProduct(data).subscribe({
        next:(res) => {
          if(res.success){
            const duplicateData = this.adminProductList();
            const index = duplicateData.findIndex((item) => item.id == productId);
            duplicateData[index] = res.data[0];
            this.adminProductList.set(duplicateData);
            this.drawerService.drawerToggle.next(false);
          }
        },
        error:(err) => {
          console.log(err);
        }
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}