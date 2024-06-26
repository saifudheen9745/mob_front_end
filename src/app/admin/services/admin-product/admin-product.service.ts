import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminProductRepository } from '../../repositories/admin-product/admin-product.repository';
import { IAdminProductList } from '../../repositories/admin-product/admin-product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService implements OnDestroy{

  private adminProductRepository = inject(AdminProductRepository);

  subscriptions:Subscription[] = [];

  public adminProductList = signal<IAdminProductList[]>([]);

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

  ngOnDestroy(): void {
      this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}