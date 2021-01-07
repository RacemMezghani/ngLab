import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberFormComponent} from "./member-form/member-form.component";
import {AffecterEtdToEnsComponent} from "./affecter-etd-to-ens/affecter-etd-to-ens.component";
import {PubListComponent} from "./pub-list/pub-list.component";
import {PubFormComponent} from "./pub-form/pub-form.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'members'
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
    path: 'tools',
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
        component: AffecterEtdToEnsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'members',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
