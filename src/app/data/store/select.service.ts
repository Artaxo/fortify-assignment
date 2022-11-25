import {Injectable} from '@angular/core';
import {StoreService} from "./store.service";
import {EMPTY, map, mergeMap, Observable} from "rxjs";
import {Post, PostWithUserData} from "../model/post.model";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  readonly POSTS_PER_PAGE = 10;

  constructor(private storeService: StoreService) {
  }

  private get getUsers(): Observable<User[]> {
    return this.storeService.getStore().users.asObservable();
  }

  private get getPosts(): Observable<Post[]> {
    return this.storeService.getStore().posts.asObservable();
  }

  public selectLoggedInUserId(): Observable<number | null> {
    return this.storeService.getStore().loggedInUserId.asObservable();
  }

  public selectLoggedInUser(): Observable<User | null> {
    return this.selectLoggedInUserId().pipe(
      mergeMap((userId) => this.selectUserById(userId).pipe(
        map((user) => {
          return user?.id === userId ? user : null;
        })
      ))
    )
  }

  public selectPostById(postId: number): Observable<Post | null> {
    return this.getPosts.pipe().pipe(
      map((posts) => posts.find(post => post.id === Number(postId)) || null)
    );
  }


  public selectAllPosts(): Observable<Post[]> {
    return this.getPosts;
  }

  public selectPostsWithUserData(page?: number): Observable<PostWithUserData[]> {
    return this.getPosts.pipe(
        mergeMap((posts)=>{
         return this.getUsers.pipe(
           map((users)=> {
             if (page) {
               posts = posts.slice(this.POSTS_PER_PAGE * page - 10, this.POSTS_PER_PAGE * page);
             }
             return posts.map((post) => {
               const user = users.find(user => user.id === post.userId)!;
               const userName = user.name;
               const userWebsite = user.website;
               const company = user.company.name;
               return {...post, userName, userWebsite, company};
             })
           })
         )
        })
    );
  }

  public postExists(postId: number): Observable<boolean> {
    return this.selectPostById(postId).pipe(
      map((post) => {
        return !!post;
      }),
    );
  }

  public isPostEditable(postId: number): Observable<boolean> {
    return this.selectPostById(postId).pipe(
      mergeMap(x => this.selectLoggedInUserId().pipe(
        map((i) => {
          return x?.userId === i
        })
      ))
    )
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this.selectLoggedInUserId().pipe(
      map((userId) => !!userId)
    )
  }

  public selectUserById(userId: number | null): Observable<User | null> {
    return this.getUsers.pipe(
      map((users) => {
          return users.find((user) => user.id === userId) || null;
        }
      )
    );
  }

  public selectUserIdByName(username: string): Observable<number | null> {
    return this.getUsers.pipe(
      map((users) => {
          const user = users.find((user) => user.username === username);
          return user ? user.id : null;
        }
      )
    );
  }

  public selectInfoMessage(): Observable<string> {
    return this.storeService.getStore().infoMessage.asObservable();
  }

  public selectPageTitle(): Observable<string> {
    return this.storeService.getStore().pageTitle.asObservable();
  }

  public selectHowManyPagesHavePosts(): Observable<number> {
    return this.getPosts.pipe(
      map((posts) => (posts.length / this.POSTS_PER_PAGE) + 1)
    );
  }
}
