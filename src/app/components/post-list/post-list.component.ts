import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostWithUserData} from "../../data/model/post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})

export class PostListComponent implements OnInit {

  @Input() posts: PostWithUserData[];
  @Input() page: number | null;
  @Input() lastPage: number | null;
  @Input() loggedInUserId: number | null;
  @Output() nextPage = new EventEmitter<void>();
  @Output() previousPage = new EventEmitter<void>();

  constructor() {
    this.posts = [];
    this.page = null;
    this.lastPage = null;
    this.loggedInUserId = null;
  }

  ngOnInit(): void {
  }

  public showNextPage(): void {
    this.nextPage.emit();
  }

  public showPreviousPage(): void {
    this.previousPage.emit();
  }

}
