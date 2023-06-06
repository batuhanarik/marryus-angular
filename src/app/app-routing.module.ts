import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeddingPlacesComponent } from './components/wedding-places/wedding-places.component';
import { AuthGuard } from './guards/auth.guard';
import { PrimaryLayoutComponent } from './pages/layouts/primary-layout/primary-layout.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AddWeddingplaceComponent } from './components/admin/add-weddingplace/add-weddingplace.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeddingplaceDetailComponent } from './components/wedding-places/weddingplace-detail/weddingplace-detail.component';
import { WeddingplaceItemsComponent } from './components/wedding-places/weddingplace-items/weddingplace-items.component';
import { WeddingplaceDetailsComponent } from './components/wedding-places/weddingplace-details/weddingplace-details.component';
import { RentalsComponent } from './components/admin/rentals/rentals.component';

const routes: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'weddingplaces',
        component: WeddingPlacesComponent,
        children: [{ path: '', component: WeddingplaceItemsComponent }],
      },
      {
        path: 'detail/:weddingPlaceId',
        component: WeddingplaceDetailsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomeAdminComponent },
      { path: 'addweddingplace', component: AddWeddingplaceComponent },
      { path: 'updateweddingplace', component: AddWeddingplaceComponent },
      { path: 'rentals', component: RentalsComponent },
    ],
  },

  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
