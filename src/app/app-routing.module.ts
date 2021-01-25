import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberFormComponent} from "./member-form/member-form.component";
import {AffecterEtdToEnsComponent} from "./affecter-etd-to-ens/affecter-etd-to-ens.component";
import {PubListComponent} from "./pub-list/pub-list.component";
import {PubFormComponent} from "./pub-form/pub-form.component";
import {EventListComponent} from "./event-list/event-list.component";
import {ToolListComponent} from "./tool-list/tool-list.component";
import {ToolFormComponent} from "./tool-form/tool-form.component";
import {EventFormComponent} from "./event-form/event-form.component";
import {AffecterPubToMemberComponent} from "./affecter-pub-to-member/affecter-pub-to-member.component";
import {AffecterEventToMemberComponent} from "./affecter-event-to-member/affecter-event-to-member.component";
import {AffecterToolToMemberComponent} from "./affecter-tool-to-member/affecter-tool-to-member.component";
import {MemberProfileComponent} from "./member-profile/member-profile.component";
import {MemberLoginComponent} from "./member-login/member-login.component";
import {MemberRegistreComponent} from "./member-registre/member-registre.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },

  {
    path: 'members',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create/:type',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      /*{
        path: 'createEns',
        pathMatch: 'full',
        component: MemberFormComponent,
      },*/
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: 'affecter',
        pathMatch: 'full',
        component: AffecterEtdToEnsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'pubs',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PubListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component:PubFormComponent,
      },
      /*{
        path: 'createEns',
        pathMatch: 'full',
        component: MemberFormComponent,
      },*/
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PubFormComponent,
      },
      {
        path: 'affecter',
        pathMatch: 'full',
        component: AffecterPubToMemberComponent,
      },
      {
        path: 'login/:type',
        pathMatch: 'full',
        component: MemberLoginComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component:EventFormComponent,
      },
      /*{
        path: 'createEns',
        pathMatch: 'full',
        component: MemberFormComponent,
      },*/
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: 'affecter',
        pathMatch: 'full',
        component: AffecterEventToMemberComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component:ToolFormComponent,
      },
      /*{
        path: 'createEns',
        pathMatch: 'full',
        component: MemberFormComponent,
      },*/
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolFormComponent,
      },
      {
        path: 'affecter',
        pathMatch: 'full',
        component: AffecterToolToMemberComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: 'member',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberLoginComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: MemberLoginComponent,
      },

      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberRegistreComponent,
      },
      {
        path: 'register/:type',
        pathMatch: 'full',
        component: MemberRegistreComponent,
      },

      {
        path: ':id/profile',
        pathMatch: 'full',
        component: MemberProfileComponent,
      },

      {
        path: '**',
        redirectTo: '',
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
