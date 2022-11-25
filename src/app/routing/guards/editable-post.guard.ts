import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, Observable, tap} from 'rxjs';
import {SelectService} from "../../data/store/select.service";
import {ActionService} from "../../data/store/action.service";
import {StorageService} from "../../tech/storage.service";
import {RoutePathsEnum} from "../routing.enum";

@Injectable({
  providedIn: 'root'
})
export class EditablePostGuard implements CanActivate {

  constructor(private selectService: SelectService,
              private actionService: ActionService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const postId = route.params['id'];
    return combineLatest(this.selectService.postExists(postId), this.selectService.isPostEditable(postId),
      (postExists: boolean, isPostEditable: boolean) => {
        return  postExists && isPostEditable
      }
    ).pipe(
      tap((flag) => {
        if (!flag) {
          this.router.navigate([RoutePathsEnum.HOME])
        }
      })
    );
  }

}
