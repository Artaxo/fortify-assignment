import {Component, Input, OnInit} from '@angular/core';
import {Post, PostWithUserData} from "../../data/model/post.model";
import {RoutePathsEnum} from "../../routing/routing.enum";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  readonly routePathsEnum = RoutePathsEnum;
  @Input() post: PostWithUserData | null;
  @Input() postEditable: boolean;

  constructor() {
    this.post = null;
    this.postEditable = false;
  }

  ngOnInit(): void {
  }

}
