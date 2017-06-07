import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthResponseComponent } from './auth-response/auth-response.component';
import { AuthContext } from './auth.context';
import { HashService } from './hash.service';
import { routing } from './authentication.routing';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    routing,
    HttpModule
  ],
  declarations: [AuthResponseComponent],
  providers:    [AuthContext, HashService]
})
export class AuthenticationModule { }
