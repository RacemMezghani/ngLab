import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Event} from "../../models/event.model";
import {FormGroup} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {Member} from "../../models/member.model";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {


  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'lieu', 'dateEvent', 'participant', 'actions'];
  dataSource: Event[] = [];
  form: FormGroup;
  item: Member;
  pubAuthors: any = {};
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


  getPubAuthors(id: any): any {
    if(!!this.pubAuthors[id]) {
      return this.pubAuthors[id];
    }
    this.memberService.getMembreByEvent(id).then(data => {
      this.pubAuthors[id] = data;
    });
  }


  fetchDataSource(): void {
    this.memberService.getAllEvents().then(data => {
      this.dataSource = data['_embedded']['eventBeanList'];
      this.dataSource.forEach(element => this.getPubAuthors(element.id));
    });


  }



  /*
    fetchDataSource(): void {
      this.memberService.getAllPub().then(data => {
        this.dataSource = data['_embedded']['publicationBeanList'];
      });
    }
  */
  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.deleteEvent(id).then(() => this.fetchDataSource());
      }
    });
  }

  onSubmit(): void {



  }




}
