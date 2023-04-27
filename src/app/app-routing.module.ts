import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeddingPlacesComponent } from './components/wedding-places/wedding-places.component';
import { AuthGuard } from './guards/auth.guard';
import { PrimaryLayoutComponent } from './pages/layouts/primary-layout/primary-layout.component';
import { AdminLayoutComponent } from './pages/layouts/admin-layout/admin-layout.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AddWeddingplaceComponent } from './components/admin/add-weddingplace/add-weddingplace.component';
import { AddPhotoWeddingplaceComponent } from './components/admin/add-photo-weddingplace/add-photo-weddingplace.component';

const routes: Routes = [
  {
    path:'',
    component:PrimaryLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path:'',
        pathMatch:'full',
        component:HomeComponent
      },
      {
        path: 'weddingplaces',
        component:WeddingPlacesComponent,
        children:[
          {path:'', component:WeddingPlacesComponent}
        ]
      },
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children: [
      {path:'',component:HomeAdminComponent},
      {path:'add',component:AddWeddingplaceComponent},
      {path:'addphoto',component:AddPhotoWeddingplaceComponent},
    ]
  },
  
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
