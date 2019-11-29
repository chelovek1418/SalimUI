import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";

import {Routes, RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SketchesComponent } from './sketches/sketches.component';
import { AdminComponent } from './admin/admin.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from "../environments/environment";
import { ImageComponent } from './image/image.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { CalenderComponent } from './admin/calender/calender.component';
import { SelectorComponent } from './admin/selector/selector.component';
import { OrganizerComponent } from './admin/organizer/organizer.component';
import { MomentPipe } from './services/moment.pipe';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'sketches', component: SketchesComponent},
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    SketchesComponent,
    AdminComponent,
    AboutComponent,
    ImageComponent,
    CalenderComponent,
    SelectorComponent,
    OrganizerComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
