import { AdminProductService } from './../../../services/admin-product/admin-product.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlMessageComponent } from '../../../../shared/components/control-message/control-message.component';
import { SharedMethodsService } from '../../../../shared/services/shared-methods/shared-methods.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptimizedImage } from '@angular/common';
import { IAdminProductCreateFormData } from '../../../repositories/admin-product/admin-product.model';
import { AdminCategoryService } from '../../../services/admin-category/admin-category.service';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../../../shared/services/drawer-service/drawer.service';

@Component({
  standalone:true,
  selector: 'app-admin-add-edit-product',
  templateUrl: './admin-add-edit-product.component.html',
  styleUrls: ['./admin-add-edit-product.component.scss'],
  imports:[ReactiveFormsModule, ControlMessageComponent, NgSelectModule, NgOptimizedImage]
})
export class AdminAddEditProductComponent implements OnInit, OnDestroy {

  @ViewChild("fileUploadLogo") uploadFile: ElementRef;

  editMode = input<boolean|undefined>(false)

  public sharedMethodsService = inject(SharedMethodsService);
  private fb = inject(FormBuilder);
  private adminProductService = inject(AdminProductService);
  public adminCategoryService = inject(AdminCategoryService);
  private drawerService = inject(DrawerService);

  subscriptions:Subscription[] = [];

  productImageFile:File;
  uploadedProductImageUrl:string = '';
  imageNotFoundError:boolean = false;

  addProductForm = this.fb.group({
    name:['',Validators.required],
    price:['',Validators.required],
    category:['' ,Validators.required],
    quantity:['',Validators.required],
    disabled:[false,Validators.required],
    description:['',Validators.required]
  })

  ngOnInit(): void {
    if(!this.editMode()){
      this.addProductForm.controls.category.setValue(null);
    }
    if(!this.adminCategoryService.adminCategoryList().length){
      this.adminCategoryService.getAllCategories();
    }
    if(this.editMode()){
      this.addProductForm.controls.category.setValue("");
      this.addProductDataToForm();
    }
  }

  uploadImage(){
    this.uploadFile.nativeElement.click();
  }

  uploadFileMethod(event:Event){
    const files = (event.target as HTMLInputElement).files;
    this.productImageFile = files?.[0] as File;
    this.imageNotFoundError = false;
    const reader = new FileReader();
    reader.onload = (event) => {
      // Generating the image url for preview while uploding
      this.uploadedProductImageUrl = reader.result as string;
    };
    reader.readAsDataURL(this.productImageFile);
  }

  submit(){
    this.addProductForm.markAllAsTouched();
    if(this.productImageFile === null){
      this.imageNotFoundError = true;
      return;
    }
    if(this.addProductForm.invalid){
      return;
    }
    if(this.editMode()){
      this.adminProductService.updateProduct(this.productImageFile,this.addProductForm.value as IAdminProductCreateFormData,this.adminProductService.productToUpdate.getValue().id);
      return;
    }
    this.adminProductService.createProduct(this.productImageFile,this.addProductForm.value as IAdminProductCreateFormData);
  }

  addProductDataToForm(){
    this.subscriptions.push(
      this.adminProductService.productToUpdate.subscribe((prod) => {
        if(this.editMode()){
          if(!prod.id){
            this.addProductForm.reset();
            this.uploadedProductImageUrl = '';
            return;
          }
          this.uploadedProductImageUrl = '';
          this.uploadedProductImageUrl = prod.image;
          this.addProductForm.patchValue({
            name:prod.name,
            category:prod.category.toString(),
            disabled:prod.disabled,
            price: prod.price.toString(),
            quantity:prod.quantity.toString(),
            description:prod.description
          })
        }
      })
    )}

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    
}

