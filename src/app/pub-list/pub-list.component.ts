import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import { Pub } from 'src/models/pub.model';
import {Member} from "../../models/member.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-pub-list',
  templateUrl: './pub-list.component.html',
  styleUrls: ['./pub-list.component.scss']
})
export class PubListComponent implements OnInit {
  chosenYearDate: Date;
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'titre', 'type', 'sourcePdf', 'lien', 'dateApparition', 'pub', 'actions'];
  dataSource: Pub[] = [];
  form: FormGroup;
  item: Pub;
  a: Array<Member>;
  e: any;
  pubAuthors: any = {};

  objectToSubmit: string[]=[];

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
    this.initForm(null);

  }
  private initForm(item: Pub): void {

    this.form = new FormGroup({

      type: new FormControl(item?.type, []),
      dateApparition: new FormControl(item?.dateApparition, []),
    });
  }

  filterType(t : string) {
    this.memberService.getAllPub()
      .then(pubs => this.dataSource = pubs['_embedded']['publicationBeanList'].filter(({ type }) =>
        type === t,
        console.log(t),

      ));


  }


  getPubAuthors(id: any): any {
    if(!!this.pubAuthors[id]) {
      return this.pubAuthors[id];
    }
    this.memberService.getAutByPub(id).then(data => {
        this.pubAuthors[id] = data;

    });

  }

  fetchDataSource(): void {

    this.memberService.getAllPub().then(data => {
      this.dataSource = data['_embedded']['publicationBeanList'];
      this.dataSource.forEach(element => this.getPubAuthors(element.id));
      this.dataSource.forEach(element => {
        if(this.objectToSubmit?.includes(element.type)==false){
        this.objectToSubmit.push(element.type)};
      console.log(this.objectToSubmit)});})


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
        this.memberService.deletePub(id).then(() => this.fetchDataSource());
      }
    });
  }

  onSubmit(): void {

    this.ResearchPub();

  }


  ResearchPub() {

    this.item = this.form.value;
    if (this.item != null) {
      if(this.e=='tous'){
        this.fetchDataSource();
      }
      else{
this.filterType(this.e);}
    }
  }

}
