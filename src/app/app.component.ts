import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionService} from "./data/store/action.service";
import {Observable, pairwise, Subscription} from "rxjs";
import {SelectService} from "./data/store/select.service";
import {User} from "./data/model/user.model";
import {StorageService} from "./tech/storage.service";
import {Router} from "@angular/router";
import {ApiServiceService} from "./data/api-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title$: Observable<string>;
  public loggedIn: Observable<boolean>;
  public loggedInUser: Observable<User | null>;
  private routeSubscription: Subscription;

  constructor(private actionService: ActionService,
              private selectService: SelectService,
              private storageService: StorageService,
              private router: Router) {
    this.loggedIn = selectService.isUserLoggedIn();
    this.title$ = selectService.selectPageTitle();
    this.loggedInUser = selectService.selectLoggedInUser();

    this.routeSubscription = this.router.events.subscribe((event) => {
      this.checkStorageWhenRouteChanges();
    });
  }

  ngOnInit(): void {
  }

  public checkStorageWhenRouteChanges() {
    const userLoginState = this.storageService.getLoggedInUser();
    this.actionService.setLoggedInUser(Number(userLoginState));
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
