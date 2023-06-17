import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeddingPlacesComponent } from './components/wedding-places/wedding-places.component';
import { AuthGuard } from './guards/auth.guard';
import { PrimaryLayoutComponent } from './pages/layouts/primary-layout/primary-layout.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AddWeddingplaceComponent } from './components/admin/add-weddingplace/add-weddingplace.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeddingplaceDetailsComponent } from './components/wedding-places/weddingplace-details/weddingplace-details.component';
import { RentalsComponent } from './components/admin/rentals/rentals.component';
import { FindEasyComponent } from './pages/find-easy/find-easy.component';
import { PlacesComponent } from './components/places/places.component';

const routes: Routes = [
  {
    path: '',
    component: PrimaryLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PlacesComponent,
      },
      {
        path: 'weddingplaces',
        component: WeddingPlacesComponent,
        children: [{ path: '', component: PlacesComponent }],
      },
      {
        path: 'detail/:weddingPlaceId',
        component: WeddingplaceDetailsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'kolayca-bul',
        component: FindEasyComponent,
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
