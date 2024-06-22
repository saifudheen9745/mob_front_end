import { RouterModule, Routes } from "@angular/router";
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminLayoutComponent } from "./layout/admin-layout.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AuthGuard } from "./core/auth.guard";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AdminCategoriesComponent } from "./components/admin-categories/admin-categories.component";
import { AdminCouponsComponent } from "./components/admin-coupons/admin-coupons.component";
import { AdminOffersComponent } from "./components/admin-offers/admin-offers.component";

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
        path:'dashboard',
        component:AdminDashboardComponent
      },
      {
        path:'products',
        component:AdminProductsComponent
      },
      {
        path:'categories',
        component:AdminCategoriesComponent
      },
      {
        path:'coupons',
        component:AdminCouponsComponent
      },
      {
        path:'offers',
        component:AdminOffersComponent
      }
    ]
  }

]

export const AdminRoutes = RouterModule.forChild(routes)