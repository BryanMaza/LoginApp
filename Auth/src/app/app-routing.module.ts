import { NoIdentityGuard } from './services/no-identity.guard';
import { UserGuard } from './services/guard.guard';

import { PerfilComponent } from './components/perfil/perfil.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: 'login', canActivate:[NoIdentityGuard] ,component: LoginComponent },
  { path: 'register',canActivate:[NoIdentityGuard] , component: RegisterComponent },
  { path: 'perfil',canActivate:[UserGuard],component: PerfilComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
