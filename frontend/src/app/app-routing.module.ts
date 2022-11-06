import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CarritoPageComponent } from './components/pages/carrito-page/carrito-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductoPageComponent } from './components/pages/producto-page/producto-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { ConfirmacionPagoPageComponent } from './components/pages/confirmacion-pago-page/confirmacion-pago-page.component';
import { SeguimientoPageComponent } from './components/pages/seguimiento-page/seguimiento-page.component';
import { CategoriasListPageComponent } from './components/pages/categorias-list-page/categorias-list-page.component';
import { PerfilPageComponent } from './components/pages/perfil-page/perfil-page.component';
import { AddCategoriaComponent } from './components/pages/add-categoria/add-categoria.component';
import { ProductosListPageComponent } from './components/pages/productos-list-page/productos-list-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'search/:searchTerm',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'categoria/:categoria',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'producto/:id',component:ProductoPageComponent,canActivate:[AuthGuard]},
  {path:'carrito',component:CarritoPageComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]},
  {path:'confirmar', component: ConfirmacionPagoPageComponent, canActivate:[AuthGuard]},
  {path:'seguimiento', component: SeguimientoPageComponent, canActivate:[AuthGuard]},
  {path:'categorias-list', component: CategoriasListPageComponent, canActivate:[AuthGuard]},
  {path:'perfil', component: PerfilPageComponent, canActivate:[AuthGuard]},
  {path:'add-categoria', component: AddCategoriaComponent, canActivate:[AuthGuard]},
  {path:'productos-list', component: ProductosListPageComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
