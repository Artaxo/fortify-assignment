import {Injectable} from '@angular/core';
import {EMPTY, map, Observable} from "rxjs";
import {SelectService} from "../data/store/select.service";
import {ActionService} from "../data/store/action.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Authentication {

  constructor(private selectService: SelectService,
              private actionService: ActionService) {
  }

  authenticate(username: string): Observable<boolean> {
    return this.selectService.selectUserIdByName(username).pipe(
      map((userId) => {
          if (userId != null) {
            this.actionService.processAuthenticatedUser(userId);
            return true;
          } else {
            return false;
          }
        }
      )
    )
  }


}

export interface Authentication {
  authenticate(username: string): Observable<boolean>;
}
