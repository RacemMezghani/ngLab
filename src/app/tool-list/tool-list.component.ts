import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {Tool} from "../../models/tool.model";

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit {


  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'nom', 'source', 'date', 'dev', 'actions'];
  dataSource: Tool[] = [];
  form: FormGroup;
  item: Tool;
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

  }

  getPubAuthors(id: any): any {
    if(!!this.pubAuthors[id]) {
      return this.pubAuthors[id];
    }
    this.memberService.getMembreByTool(id).then(data => {
      this.pubAuthors[id] = data;
    });
  }

  fetchDataSource(): void {
    this.memberService.getAllTools().then(data => {
      this.dataSource = data['_embedded']['toolBeanList'];
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
        this.memberService.deleteTool(id).then(() => this.fetchDataSource());
      }
    });
  }

  onSubmit(): void {



  }




}
