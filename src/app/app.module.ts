import { CommonModule, registerLocaleData } from '@angular/common';
import tr from '@angular/common/locales/tr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NzConfig } from 'ng-zorro-antd/core/config';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { lightTheme } from './theme';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { ENVIRONMENT } from './tokens/environment.token';
import { environment } from 'src/environments/environment.development';
import { NZ_I18N, tr_TR } from 'ng-zorro-antd/i18n';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { PrimaryLayoutComponent } from './pages/layouts/primary-layout/primary-layout.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FooterComponent } from './components/footer/footer.component';
import { WeddingPlacesComponent } from './components/wedding-places/wedding-places.component';
import { SearchWeddingplaceComponent } from './components/wedding-places/search-weddingplace/search-weddingplace.component';
import { FilterPipe } from './pipes/filter.pipe';
import { WeddingPlaceItemComponent } from './components/wedding-places/wedding-place-item/wedding-place-item.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ApiImagePipe } from './pipes/api-image.pipe';
import { UpdateWeddingplaceComponent } from './components/admin/update-weddingplace/update-weddingplace.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { InputMaskModule } from 'primeng/inputmask';
import { WeddingplaceDetailComponent } from './components/wedding-places/weddingplace-detail/weddingplace-detail.component';
import { WeddingplaceDetailsComponent } from './components/wedding-places/weddingplace-details/weddingplace-details.component';
import { WeddingplaceRentComponent } from './components/wedding-places/weddingplace-rent/weddingplace-rent.component';
import { RentalsComponent } from './components/admin/rentals/rentals.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FindEasyComponent } from './pages/find-easy/find-easy.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PlacesComponent } from './components/places/places.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { SidebarModule } from 'primeng/sidebar';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginatorModule } from 'primeng/paginator';
registerLocaleData(tr);
const ngZorroConfig: NzConfig = {
  theme: lightTheme,
};
@NgModule({
  declarations: [
    AppComponent,
    PrimaryLayoutComponent,
    FooterComponent,
    WeddingPlacesComponent,
    SearchWeddingplaceComponent,
    FilterPipe,
    WeddingPlaceItemComponent,
    AdminLayoutComponent,
    HomeAdminComponent,
    ApiImagePipe,
    UpdateWeddingplaceComponent,
    ProfileComponent,
    WeddingplaceDetailComponent,
    WeddingplaceDetailsComponent,
    WeddingplaceRentComponent,
    RentalsComponent,
    FindEasyComponent,
    PlacesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    DynamicDialogModule,
    ConfirmDialogModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    CarouselModule,
    DropdownModule,
    FileUploadModule,
    CardModule,
    GalleriaModule,
    AccordionModule,
    ListboxModule,
    CalendarModule,
    MessagesModule,
    NzResultModule,
    NzModalModule,
    InputMaskModule,
    TableModule,
    NzDividerModule,
    PanelMenuModule,
    NzGridModule,
    NzDrawerModule,
    DragDropModule,
    ScrollingModule,
    NzAffixModule,
    SidebarModule,
    NzPaginationModule,
    PaginatorModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: ENVIRONMENT, useValue: environment },
    { provide: NZ_I18N, useValue: tr_TR },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: LOCALE_ID, useValue: 'tr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
