import {Component, Input, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {ActionService} from "../../data/store/action.service";
import {RoutePathsEnum} from "../../routing/routing.enum";
import {User} from "../../data/model/user.model";
import {SelectService} from "../../data/store/select.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public routePathsEnum = RoutePathsEnum;
  @Input() loggedIn: boolean;
  @Input() welcomeMessage: string | null;
  @Input() pageTitle: string | null;
  @Input() loggedInUser: User | null;

  constructor(private readonly route: ActivatedRoute,
              private actionService: ActionService) {
    this.loggedIn = false;
    this.welcomeMessage = null;
    this.pageTitle = null;
    this.loggedInUser = null;
  }

  ngOnInit(): void {
  }

  public logout() {
    this.actionService.logoutUser();
  }

}
