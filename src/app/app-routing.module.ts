import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { BrandProductsComponent } from './components/brand-products/brand-products.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component:HomeComponent, title: 'home' },
      { path: 'cart', component: CartComponent, title: 'cart' },
      { path: 'products', component: ProductsComponent, title: 'products' },
      {
        path: 'product/details/:id',
        component: DetailsComponent,
        title: 'product details',
      },
      { path: 'checkout/:id', component: CheckoutComponent, title: 'checkout' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
      },
      {
        path: 'categories/product/:id',
        component: CategoryProductComponent,
        title: 'product for categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      {
        path: 'brands/product/:id',
        component: BrandProductsComponent,
        title: 'Product for Brands',
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'all product favorites',
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'all your orders',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'login',
      },
      { path: 'signup', component: RegisterComponent, title: 'register' },
      {
        path: 'forgetPassword',
        component: ForgetpasswordComponent,
        title: 'forgetPassword',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'page not found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
