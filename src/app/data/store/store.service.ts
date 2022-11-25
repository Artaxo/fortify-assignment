import {Injectable} from '@angular/core';
import {Store, storeInit} from "../model/store.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private store: Store;

  constructor() {
    this.store = storeInit();
  }

  public getStore(): Store {
    return this.store;
  }

}

export interface StoreSetters {
  setUsers(): void;
  setPosts(): void;
  setLoggedInUser(userId: number): void;
  setInfoMessage(message: string): void;
  setPageTitle(pageTitle: string): void;
}

