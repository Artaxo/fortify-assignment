import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../tech/auth.service";
import {EMPTY, Subscription} from "rxjs";
import {RouteTitlesEnum} from "../../routing/routing.enum";
import {ActionService} from "../../data/store/action.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  private authServiceSub!: Subscription;
  public authError: string | null;
  readonly PAGE_TITLE = RouteTitlesEnum.LOGIN;

  constructor(private authService: AuthService,
              private actionService: ActionService) {
    this.authError = null;
    actionService.setPageTitle(this.PAGE_TITLE);
  }

  ngOnInit(): void {
  }

  public loginSubmit(username: string): void {
    this.authService.authenticate(username).subscribe(
      (data) => {
        this.authError = data ? null : "Incorrect username";
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authServiceSub) {
      this.authServiceSub.unsubscribe();
    }
  }


}
