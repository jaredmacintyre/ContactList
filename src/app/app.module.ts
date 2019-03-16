import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error.interceptor';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatTabsModule, MatListModule, 
         MatExpansionModule, MatToolbarModule, MatSnackBarModule, MatCardModule } from '@angular/material';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ListComponent } from './list/list.component';
import { TabComponent } from './tab/tab.component';

import { ListService } from './list.service';
import { ExportComponent } from './export/export.component';
import { RestComponent } from './rest/rest.component';
import { SoapComponent } from './soap/soap.component';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDkyycafyjFJhAe72wdzrjcv91nVtONF_8",
  authDomain: "contact-list-4450.firebaseapp.com",
  databaseURL: "https://contact-list-4450.firebaseio.com",
  projectId: "contact-list-4450",
  storageBucket: "contact-list-4450.appspot.com",
  messagingSenderId: "1073322372011"
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ListComponent,
    TabComponent,
    ExportComponent,
    RestComponent,
    SoapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCardModule
  ],
  providers: [
    ListService, 
    { 
      provide: FirestoreSettingsToken, 
      useValue: {} 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
