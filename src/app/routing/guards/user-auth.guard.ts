import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, pipe, tap, UnaryFunction} from 'rxjs';
import {SelectService} from "../../data/store/select.service";
import {RoutePathsEnum} from "../routing.enum";
import {ActionService} from "../../data/store/action.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private selectService: SelectService,
              private actionService: ActionService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const pathIsLogin = route.routeConfig?.path === RoutePathsEnum.LOGIN;
    return this.selectService.isUserLoggedIn().pipe(
      flipFlagIfLogin(pathIsLogin),
      tap((flag) => {
        if (!flag) {
          this.router.navigate([RoutePathsEnum.HOME])
        }
      }),
    );
  }

}

export function flipFlagIfLogin(pathIsLogin?: boolean): UnaryFunction<Observable<boolean>, Observable<boolean>> {
  return pipe(
    map((logged) => {
      if (logged && pathIsLogin) {
        return false;
      } else if (!logged && pathIsLogin) {
        return true;
      } else if (logged && !pathIsLogin) {
        return true;
      }
      return logged;
    })
  );
}
