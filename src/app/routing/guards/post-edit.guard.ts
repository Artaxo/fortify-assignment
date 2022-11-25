import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, EMPTY, Observable, tap} from 'rxjs';
import {SelectService} from "../../data/store/select.service";
import {RoutePathsEnum} from "../routing.enum";
import {ActionService} from "../../data/store/action.service";
import {StorageService} from "../../tech/storage.service";

@Injectable({
  providedIn: 'root'
})
export class PostEditGuard implements CanActivate {

  constructor(private selectService: SelectService,
              private actionService: ActionService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const postId = route.params['id'];
    return combineLatest(this.selectService.postExists(postId), this.selectService.isUserLoggedIn(),
      (postExists: boolean, userLoggedIn: boolean) => {
        return postExists && userLoggedIn
      }
    ).pipe(
      tap((flag: boolean) => {
        if (!flag) {
          this.router.navigate([RoutePathsEnum.HOME]);
        }
      })
    );
  }

}
