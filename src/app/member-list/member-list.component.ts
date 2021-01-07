import { Component, OnInit } from '@angular/core';
import {GLOBAL} from "../app-config";
import {MemberService} from "../../services/member.service";
import {Member} from "../../models/member.model";
import {Subject} from "rxjs";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'cv', 'encadrant', 'actions'];
  dataSource: Member[] = [];

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
  ) {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  ngOnInit(): void {
    this.fetchDataSource();
  }

  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
    });
  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });
  }


  filterEtd(){
    this.memberService.getAllMembers()
      .then(etudiants => this.dataSource = etudiants.filter(({ type }) =>
        type === 'etudiant',

      ));
  }

  filterEns() {
    this.memberService.getAllMembers()
      .then(enseignants => this.dataSource = enseignants.filter(({ type }) =>
        type === 'enseignant',

      ));


  }
}
