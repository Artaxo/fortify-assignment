import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {RoutePathsEnum, RouteTitlesEnum} from "../../routing/routing.enum";
import {Observable, Subscription, mergeMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {isPostGuard, Post, postInit} from "../../data/model/post.model";
import {SelectService} from "../../data/store/select.service";
import {ActionService} from "../../data/store/action.service";
import {ComponentCanDeactivate} from "./navigation-away-check.guard";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
  readonly routePathsEnum = RoutePathsEnum;
  readonly PAGE_TITLE = RouteTitlesEnum.POST_NEW;
  private postDataSubscription: Subscription;

  public post: Post;
  public untouched: boolean;

  public titleError: string | null;
  public bodyError: string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private selectService: SelectService,
              private actionService: ActionService) {

    this.post = postInit();
    this.actionService.setPageTitle(this.PAGE_TITLE);
    this.untouched = true;
    this.titleError = null;
    this.bodyError = null;

    this.postDataSubscription = this.activatedRoute.params.pipe(
      mergeMap((params) => {
        this.post.id = Number(params["id"]) >= 0 ? Number(params["id"]) : null;
        return this.post.id === null ? selectService.selectLoggedInUserId() : selectService.selectPostById(this.post.id);
      })
    ).subscribe(
      (postOrLoggedUserId) => {
        if (isPostGuard(postOrLoggedUserId)) {
          this.post = postOrLoggedUserId;
          this.actionService.setPageTitle(RouteTitlesEnum.POST_EDIT);
        } else {
          this.post.userId = postOrLoggedUserId;
        }
      }
    );

  }

  ngOnInit(): void {
  }

  get editMode(): boolean {
    return this.post.id !== null;
  }

  public updatePost() {
    this.actionService.updatePost(this.post);
  }

  public createPost() {
    this.actionService.createPost(this.post);
  }

  public deletePost() {
    const result = confirm("Are you sure you want to delete this post?");
    if (result) {
      this.actionService.deletePostById(this.post.id!);
    }
  }

  public inputInteraction(): void {
    this.untouched = false;
    this.validate();
  }

  public validate(): boolean {

    if (this.post.title.length === 0 || this.post.title.length > 200) {
      this.titleError = this.post.title.length === 0 ?
        ValidationErrors.notEmpty : ValidationErrors.max200;
    } else {
      this.titleError = null;
    }

    if (this.post.body.length === 0 || this.post.title.length > 2000) {
      this.bodyError = this.post.body.length === 0 ?
        ValidationErrors.notEmpty : ValidationErrors.max2000;
    } else {
      this.bodyError = null;
    }

    return this.titleError === null && this.bodyError === null;
  }

  ngOnDestroy(): void {
    if (this.postDataSubscription) {
      this.postDataSubscription.unsubscribe();
    }
  }

  @HostListener('window:beforeunload')
  @HostListener('window:onpagehide')
  canDeactivate(): boolean | Observable<boolean> {
    return this.untouched;
  }
}

export enum ValidationErrors {
  notEmpty = 'The field can\'t be empty',
  max200 = 'The field can have maximum of 200 characters',
  max2000 = 'The field can have maximum of 2000 characters',
}
