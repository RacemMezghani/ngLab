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
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { EventListComponent } from './event-list/event-list.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { EventFormComponent } from './event-form/event-form.component';
import { AffecterToolToMemberComponent } from './affecter-tool-to-member/affecter-tool-to-member.component';
import { AffecterPubToMemberComponent } from './affecter-pub-to-member/affecter-pub-to-member.component';
import { AffecterEventToMemberComponent } from './affecter-event-to-member/affecter-event-to-member.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { MemberRegistreComponent } from './member-registre/member-registre.component';
import {DashboardComponent} from "./dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent,
    LayoutComponent,
    AffecterEtdToEnsComponent,
    PubListComponent,
    PubFormComponent,
    EventListComponent,
    ToolListComponent,
    ToolFormComponent,
    EventFormComponent,
    AffecterToolToMemberComponent,
    AffecterPubToMemberComponent,
    AffecterEventToMemberComponent,
    MemberProfileComponent,
    MemberLoginComponent,
    MemberRegistreComponent,
    DashboardComponent,


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
      MatDatepickerModule,
      MatNativeDateModule,


    ],
  providers: [MatDatepickerModule, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
