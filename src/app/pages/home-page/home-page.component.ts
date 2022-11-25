import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable} from "rxjs";
import {Post, PostWithUserData} from "../../data/model/post.model";
import {SelectService} from "../../data/store/select.service";
import {User} from "../../data/model/user.model";
import {RouteTitlesEnum} from "../../routing/routing.enum";
import {ActionService} from "../../data/store/action.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public posts$: Observable<PostWithUserData[]>;
  public loggedInUserId$: Observable<number | null>;
  public page: number;
  public lastPage$: Observable<number>;
  readonly PAGE_TITLE = RouteTitlesEnum.HOME;

  constructor(private selectService: SelectService,
              private actionService: ActionService) {
    this.loggedInUserId$ = selectService.selectLoggedInUserId();
    this.lastPage$ = selectService.selectHowManyPagesHavePosts();
    this.page = 1;
    this.posts$ = selectService.selectPostsWithUserData(this.page);
    actionService.setPageTitle(this.PAGE_TITLE);
  }

  public selectNextPage(): void {
    this.page++;
    this.posts$ = this.selectService.selectPostsWithUserData(this.page);
  }

  public selectPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
    this.posts$ = this.selectService.selectPostsWithUserData(this.page);
  }

  ngOnInit(): void {
  }

}
