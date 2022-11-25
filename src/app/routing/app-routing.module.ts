import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutePathsEnum, RouteTitlesEnum} from "./routing.enum";
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {LoginPageComponent} from "../pages/login-page/login-page.component";
import {PostPageComponent} from "../pages/post-page/post-page.component";
import {PostEditGuard} from "./guards/post-edit.guard";
import {UserAuthGuard} from "./guards/user-auth.guard";

const routes: Routes = [
  {path: RoutePathsEnum.HOME, title: RouteTitlesEnum.HOME, component: HomePageComponent},
  {
    path: RoutePathsEnum.LOGIN,
    canActivate: [UserAuthGuard],
    title: RouteTitlesEnum.LOGIN,
    component: LoginPageComponent
  },
  {
    path: RoutePathsEnum.POST,
    title: RouteTitlesEnum.POST_NEW,
    canActivate: [UserAuthGuard],
    component: PostPageComponent
  },
  {
    path: RoutePathsEnum.POST + '/:id',
    canActivate: [UserAuthGuard, PostEditGuard],
    title: RouteTitlesEnum.POST_EDIT,
    component: PostPageComponent
  },
  {path: '', redirectTo: RoutePathsEnum.HOME, pathMatch: 'full'},
  {path: '**', redirectTo: RoutePathsEnum.HOME, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
