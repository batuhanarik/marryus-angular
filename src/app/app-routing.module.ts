import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WeddingPlacesComponent } from './components/wedding-places/wedding-places.component';
import { AuthGuard } from './guards/auth.guard';
import { PrimaryLayoutComponent } from './pages/layouts/primary-layout/primary-layout.component';

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
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'weddingplaces',
    component:WeddingPlacesComponent,
    children:[
      {path:'', component:WeddingPlacesComponent}
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
