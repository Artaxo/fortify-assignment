import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly USER_KEY = 'fa_user';

  constructor() {}

  public storeLoggedInUser(value: string): void {
    localStorage.setItem(this.USER_KEY, value);
  }

  public getLoggedInUser(): string | null{
    return localStorage.getItem(this.USER_KEY)
  }

  public clearLoggedInUser() {
    localStorage.removeItem(this.USER_KEY);
  }
}
