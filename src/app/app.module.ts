import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import {HttpClientModule} from "@angular/common/http";
import {ActionService} from "./data/store/action.service";
import { HttpsPipe } from './pipes/https.pipe';
import {FormsModule} from "@angular/forms";

export function initializeAppFactory(actionService: ActionService): () => Promise<void> {
  return () => actionService.fillStoreWithData();
}

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    LoginComponent,
    NavbarComponent,
    HomePageComponent,
    LoginPageComponent,
    PostPageComponent,
    InfoMessageComponent,
    HttpsPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [ActionService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
