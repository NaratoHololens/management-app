import { ModuleWithProviders} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthResponseComponent} from './auth-response/auth-response.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'authresponse', component: AuthResponseComponent }
]);
