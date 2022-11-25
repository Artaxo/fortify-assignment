import {Injectable} from '@angular/core';
import {StoreService, StoreSetters} from "./store.service";
import {ApiServiceService} from "../api-service.service";
import {Router} from "@angular/router";
import {RoutePathsEnum} from "../../routing/routing.enum";
import {StorageService} from "../../tech/storage.service";
import {Post} from "../model/post.model";

@Injectable({
  providedIn: 'root'
})
export class ActionService implements StoreSetters {

  constructor(private storeService: StoreService,
              private apiServiceService: ApiServiceService,
              private storageService: StorageService,
              private router: Router
  ) {
  }

  // BEGIN Store setters //

  public async fillStoreWithData(): Promise<void> {
    await this.setUsers();
    await this.setPosts();
  }

  public async setPosts() {
    const posts = await this.apiServiceService.fetchPosts();
    this.storeService.getStore().posts.next(posts);
  }

  public async setUsers() {
    const users = await this.apiServiceService.fetchUsers();
    this.storeService.getStore().users.next(users);
  }

  public setLoggedInUser(userId: number): void {
    this.storeService.getStore().loggedInUserId.next(userId);
    this.storageService.storeLoggedInUser(String(userId));
  }

  public setInfoMessage(message: string): void {
    this.storeService.getStore().infoMessage.next(message);
  }

  public setPageTitle(pageTitle: string): void {
    this.storeService.getStore().pageTitle.next(pageTitle);
  }

  // END Store setters //

  public deletePostById(postId: number): void {
    this.storeService.getStore().posts.next(
      this.storeService.getStore().posts.value.filter((post) => post.id !== postId)
    );
    this.setInfoMessage('Post was successfully deleted');
    this.router.navigate([RoutePathsEnum.HOME]);
  }

  public updatePost(postObj: Post): void {
    let updateCounter = 0;
    this.storeService.getStore().posts.next(
      this.storeService.getStore().posts.value.map((post) => {
          if (post.id === postObj.id) {
            updateCounter++;
            return {...postObj}
          } else {
            return post;
          }
        }
      ));
    updateCounter === 1 ? this.setInfoMessage('Post was successfully updated') :
      this.setInfoMessage('There was an error when updating post');
    this.router.navigate([RoutePathsEnum.HOME]);
  }

  public createPost(newPost: Post): void {
    const maxId = Math.max(...this.storeService.getStore().posts.value.map(post => post.id!));
    newPost.id = maxId + 1;

    this.storeService.getStore().posts.next([newPost].concat(
      this.storeService.getStore().posts.value
    ));

    this.setInfoMessage('Post was successfully created');
    this.router.navigate([RoutePathsEnum.HOME]);
  }

  public logoutUser(): void {
    this.storeService.getStore().loggedInUserId.next(null);
    this.router.navigate([RoutePathsEnum.LOGIN]);
    this.storageService.clearLoggedInUser();
  }

  public processAuthenticatedUser(userId: number) {
    this.setLoggedInUser(userId);
    this.storageService.storeLoggedInUser(String(userId));
    this.router.navigate([RoutePathsEnum.HOME]);
  }

}
