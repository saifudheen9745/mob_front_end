import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminLayoutComponent } from "./layout/admin-layout.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AuthGuard } from "./core/auth.guard";

export const routes: Routes = [
  {
    path:'login',
    canActivate:[AuthGuard],
    data:{role:'checkIsLoggedIn'},
    component:AdminLoginComponent
  },
  {
    path:'',
    canActivateChild:[AuthGuard],
    component:AdminLayoutComponent,
    children:[
      {
        path:'products',
        component:AdminProductsComponent
      }
    ]
  }

]

export const AdminRoutes = RouterModule.forChild(routes)