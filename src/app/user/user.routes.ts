import { RouterModule, Routes } from "@angular/router";
import { UserLoginComponent } from "./components/user-login/user-login.component";
import { UserLayoutComponent } from "./layout/user-layout.component";
import { UserHomeComponent } from "./components/user-home/user-home.component";

export const routes: Routes = [
  {
    path:'login',
    component:UserLoginComponent
  },
  {
    path:'',
    component:UserLayoutComponent,
    children:[
      {
        path:'home',
        component:UserHomeComponent
      }
    ]
  }
]

export const UserRoutes = RouterModule.forChild(routes);