import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "../@root/material/material.module";
import { MemberFormComponent } from './member-form/member-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './layout/layout.component';
import {ConfirmDialogModule} from "../@root/confirm-dialog/confirm-dialog.module";
import { AffecterEtdToEnsComponent } from './affecter-etd-to-ens/affecter-etd-to-ens.component';
import { PubListComponent } from './pub-list/pub-list.component';
import { PubFormComponent } from './pub-form/pub-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent,
    LayoutComponent,
    AffecterEtdToEnsComponent,
    PubListComponent,
    PubFormComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        HttpClientModule,
        ConfirmDialogModule,
        FormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
