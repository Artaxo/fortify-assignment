import {Component, OnInit} from '@angular/core';
import {SelectService} from "../../data/store/select.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit {

  public message: Observable<string>;

  constructor(private selectService: SelectService) {
    this.message = selectService.selectInfoMessage();
  }

  ngOnInit(): void {
  }

}
