import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import { Pub } from 'src/models/pub.model';
import {Member} from "../../models/member.model";

@Component({
  selector: 'app-pub-list',
  templateUrl: './pub-list.component.html',
  styleUrls: ['./pub-list.component.scss']
})
export class PubListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'type', 'sourcePdf', 'lien', 'dateApparition', 'pub', 'actions'];
  dataSource: Pub[] = [];
  dataSource1: Member;dataSource2: Member;
  a: Array<Member>;
  e: any;

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
   // this.fetchDataSource1(this.e);

  }
  fetchDataSource2(id: any): void {
    this.dataSource2=this.fetchDataSource1(id);

  }


  fetchDataSource1(id: any): Member {
    this.memberService.getAutByPub(id).then(data => {
      this.dataSource1 = data;

    });
    return this.dataSource1;
  }

  fetchDataSource(): void {
    this.memberService.getAllPub().then(data => {
      this.dataSource = data['_embedded']['publicationBeanList'];
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
        this.memberService.deletePub(id).then(() => this.fetchDataSource());
      }
    });
  }



}
