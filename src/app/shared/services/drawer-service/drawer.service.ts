import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  /**
   * @description Subject to set the component that needs to be displayed in the drawer component.
   */
  drawerComponent = new BehaviorSubject<{component:string,isUpdateMode?:boolean,close?:boolean}>({} as {component:string,isUpdateMode?:boolean});

  /**
   * @description Subject to open/close the drawer in the admin layout.
   */
  drawerToggle = new Subject();

}
