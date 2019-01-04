import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterbarComponent } from './footerbar/footerbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NavbarComponent,
    FooterbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
	CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
