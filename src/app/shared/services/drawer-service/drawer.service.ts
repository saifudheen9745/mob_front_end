import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  /**
   * @description Subject to set the component that needs to be displayed in the drawer component.
   */
  drawerComponent = new Subject<'adminAddEditProduct'>();

  /**
   * @description Subject to open/close the drawer in the admin layout.
   */
  drawerToggle = new Subject();

}
