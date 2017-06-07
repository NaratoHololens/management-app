import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { DatePipe } from "@angular/common";
import { AppComponent } from './app.component';
import {MaterialModule} from '@angular/material';
import {CalendarModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {BasicSnackComponent} from "./components/basic-snack/basic-snack.component";


import {UserListComponent} from './components/user-list/user-list.component';
import {UserPageComponent} from './components/userlist-page/userlist-page.component';
import {CameraComponent} from "./components/camera/camera.component";
import {InputFileReaderComponent} from "./components/input-file-reader/input-file-reader.component";
import {EditUserFormComponent} from "./components/edit-user-form/edit-user-form.component";
import {CreateUserPageComponent} from "./components/create-user-page/create-user-page.component";
import {ModifyUserPageComponent} from "./components/modify-user-page/modify-user-page.component";
import {UserDetailPageComponent} from "./components/user-detail-page/user-detail-page.component";
import {InteractivePageComponent} from "./components/interactive-page/interactive-page.component";
import {UserService} from "./services/user.service";
import {PersonlookupRequestService} from "./services/personLookupRequest.service";
import { AuthenticationModule } from './authentication/authentication.module';
import {LogService} from "./services/log.service";
import {StatisticsPageComponent} from "./components/statistics-page/statistics-page.component";
import {StatisticsGraphComponent} from "./components/statistics-graph/statistics-graph.component";
import {ControlPanelComponent} from "./components/control-panel/control-panel.component";
import {UserStateService} from "./services/users-state.service";
import {appRoutes, AppRouting} from "./util/app.routing";

@NgModule({
  declarations: [
    AppComponent,
    BasicSnackComponent,
    UserPageComponent,
    UserListComponent,
    EditUserFormComponent,
    CreateUserPageComponent,
    ModifyUserPageComponent,
    UserDetailPageComponent,
    CameraComponent,
    InteractivePageComponent,
    ControlPanelComponent,
    StatisticsPageComponent,
    StatisticsGraphComponent,
    InputFileReaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    BrowserAnimationsModule,
    CalendarModule,
    MaterialModule,
    AuthenticationModule,
    AppRouting
    /*RouterModule.forRoot([
      //hier aangeven naar welk component een bepaald pad je leidt.
      {path: '', component: InteractivePageComponent},
      {path: 'users', component: UserPageComponent},
      {path: 'createUser', component: CreateUserPageComponent},
      {path: 'goModifyUser/:id', component: ModifyUserPageComponent},
      {path: 'user/:id', component: UserDetailPageComponent},
      {path: 'statistics/:id', component: StatisticsPageComponent},
      {path: '**', component: InteractivePageComponent}
    ])*/
  ],
  providers: [Title, DatePipe, UserStateService, UserService, PersonlookupRequestService, LogService],
  bootstrap: [AppComponent, BasicSnackComponent]
})
export class AppModule { }
