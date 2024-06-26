import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../services/drawer-service/drawer.service';
import { CommonModule } from '@angular/common';
import { AdminAddEditProductComponent } from '../../../admin/components/drawer-component-collections/admin-add-edit-product/admin-add-edit-product.component';
import { DummyComponent } from '../../../admin/components/drawer-component-collections/dummy/dummy.component';

@Component({
  standalone:true,
  selector: 'app-drawer-components',
  templateUrl: './drawer-components.component.html',
  styleUrls: ['./drawer-components.component.scss'],
  imports:[CommonModule, AdminAddEditProductComponent,DummyComponent]
})
export class DrawerComponentsComponent implements OnInit {

  private drawerService = inject(DrawerService);

  subscriptions: Subscription[] = [];
  currentDrawerComponent: {component:string,isUpdateMode?:boolean,close?:boolean};


  ngOnInit(): void {
    this.listenForDrawerChange();
  }

  /**
   * @description This method will listen to the drawer changes and open/close the drawer.
   * display different components in the drawer based on the currentDrawerComponent data.
   */
  listenForDrawerChange() {
    this.subscriptions.push(
      this.drawerService.drawerComponent.subscribe((res) => {
        this.currentDrawerComponent = res;
        if(res.component === ''){
          return;
        }
        this.drawerService.drawerToggle.next(true);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
