import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { DrawerService } from './shared/services/drawer-service/drawer.service';
import { DrawerComponentsComponent } from './shared/components/drawer-components/drawer-components.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, DrawerComponentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  @ViewChild('drawer') drawer: MatSidenav;

  private drawerService = inject(DrawerService);

  title = 'mob_front_end';

  ngOnInit(): void {
    this.listenForDrawerToggle();
  }

  /**
   * @description This method listens to the open/close of the drawer toggle.
   */
  listenForDrawerToggle() {
    this.drawerService.drawerToggle.subscribe((res) => {
      if (res) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });
  }
}
