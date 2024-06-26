import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminCategoryRepository } from '../../repositories/admin-category/admin-category.repository';
import { IAdminCategoryList } from '../../repositories/admin-category/admin-category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService implements OnDestroy{

  private adminCategoryRepository = inject(AdminCategoryRepository);

  subscriptions:Subscription[] = [];

  public adminCategoryList = signal<IAdminCategoryList[]>([]);

  getAllCategories(){
    this.subscriptions.push(
      this.adminCategoryRepository.getAllCategories().subscribe({
        next:(res) => {
          if(res.success){
            this.adminCategoryList.set(res.data);
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
