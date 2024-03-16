import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryitemComponent } from './components/categoryitem/categoryitem.component';
import { BrandComponent } from './components/brand/brand.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { BrandProductsComponent } from './components/brand-products/brand-products.component';
import { GalleriaModule } from 'primeng/galleria';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    HomeComponent,
    CartComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavAuthComponent,
    NavBlankComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    MainSliderComponent,
    CategorySliderComponent,
    SearchPipe,
    CheckoutComponent,
    AllordersComponent,
    ForgetpasswordComponent,
    CategoryitemComponent,
    BrandComponent,
    WishlistComponent,
    CategoryProductComponent,
    BrandProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    RxReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgbPaginationModule,
    NgxSpinnerModule,
    GalleriaModule,
    StepsModule,
    ToastModule,
    SkeletonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
