import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() username = new EventEmitter<string>();
  @Input() hasError: string | null;

  public usernameValue: string;

  constructor() {
    this.hasError = null;
    this.usernameValue = '';
  }

  public login(): void {
    this.username.emit(this.usernameValue);
  }

  ngOnInit(): void {
  }

}
