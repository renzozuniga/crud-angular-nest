import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FormatDate } from './pipes/format-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HeaderComponent,
    FormatDate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    FormatDate
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
