import {Routes, RouterModule} from "@angular/router";
import {InteractivePageComponent} from "../components/interactive-page/interactive-page.component";
import {StatisticsPageComponent} from "../components/statistics-page/statistics-page.component";
import {UserDetailPageComponent} from "../components/user-detail-page/user-detail-page.component";
import {ModifyUserPageComponent} from "../components/modify-user-page/modify-user-page.component";
import {CreateUserPageComponent} from "../components/create-user-page/create-user-page.component";
import {UserPageComponent} from "../components/userlist-page/userlist-page.component";
/**
 * Created by Daryl on 30/05/2017.
 */


export const appRoutes: Routes = [
    {path: '', component: InteractivePageComponent},
    {path: 'users', component: UserPageComponent},
    {path: 'createUser', component: CreateUserPageComponent},
    {path: 'goModifyUser/:id', component: ModifyUserPageComponent},
    {path: 'user/:id', component: UserDetailPageComponent},
    {path: 'statistics/:id', component: StatisticsPageComponent},
    {path: '**', component: InteractivePageComponent}
];

export const AppRouting = RouterModule.forRoot(appRoutes);