
import { Component, OnInit, inject } from '@angular/core';
import { AdminCategoryService } from '../../services/admin-category/admin-category.service';
import { NgOptimizedImage } from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
  imports:[NgOptimizedImage]
})
export class AdminCategoriesComponent implements OnInit {

  public adminCategoryService = inject(AdminCategoryService);

  ngOnInit() {
    this.adminCategoryService.getAllCategories();
  }

}
