import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from '../auth/auth-guard.service';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { AuthInterceptor } from '../shared/auth.interceptor';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CoreRoutingModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  exports: [
    HomeComponent,
    HeaderComponent
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule { }
