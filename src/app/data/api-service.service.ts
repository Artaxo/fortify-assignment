import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {User} from "./model/user.model";
import {Post} from "./model/post.model";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient: HttpClient) {
  }

  public async fetchUsers(): Promise<User[]> {
    return (await firstValueFrom(this.httpClient.get(environment.usersApi))) as User[];
  }

  public async fetchPosts(): Promise<Post[]> {
    return (await firstValueFrom(this.httpClient.get(environment.postsApi))) as Post[];
  }

}
