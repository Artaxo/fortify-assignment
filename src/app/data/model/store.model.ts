import {Post} from "./post.model";
import {User} from "./user.model";
import {BehaviorSubject} from "rxjs";

export interface Store {
  loggedInUserId: BehaviorSubject<number | null>;
  posts: BehaviorSubject<Post[]>;
  users: BehaviorSubject<User[]>;
  infoMessage: BehaviorSubject<string>;
  pageTitle: BehaviorSubject<string>;
}

export function storeInit() {
  return {
    loggedInUserId: new BehaviorSubject<number | null>(null),
    posts: new BehaviorSubject<Post[]>([]),
    users: new BehaviorSubject<User[]>([]),
    infoMessage: new BehaviorSubject(''),
    pageTitle: new BehaviorSubject(''),
  } as Store;
}
