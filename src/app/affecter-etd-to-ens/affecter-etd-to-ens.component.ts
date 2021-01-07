import { Component, OnInit } from '@angular/core';
import {forkJoin, Observable, Subject} from "rxjs";
import {Member} from "../../models/member.model";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {map, takeUntil} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { MatSelectChange } from '@angular/material/select';
import {getActiveOffset} from "@angular/material/datepicker/multi-year-view";

@Component({
  selector: 'app-affecter-etd-to-ens',
  templateUrl: './affecter-etd-to-ens.component.html',
  styleUrls: ['./affecter-etd-to-ens.component.scss']
})
export class AffecterEtdToEnsComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['nomEtd', 'nomEns'];
  dataSource: Member[] = [];
  etudiants: Member[] = [];
  enseignants: Member[] = [];
  etudiantsEncadre: Array<Member>;


  i:number=0;
  item: Member;
  form: FormGroup;
  private currentItemId: any;
  private selectedData: { text: string; value: any };

  Vencadrant: any;
  Vetudiant: any;
  Vens: string;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
    private dialog: MatDialog,
  ) {
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getByEncadrant(idens: string): Member[] {
    this.memberService.getByEncadrant(idens).then(data => {
      this.etudiantsEncadre = data;
      //console.log(this.etudiantsEncadre);
    });
    return this.etudiantsEncadre;

  }
  getEtudiants(): void {
    this.memberService.getAllMembers()
      .then(etudiants => this.etudiants = etudiants.filter(({ type }) =>
        type === 'etudiant',
        console.log(this.etudiants),
      ));

  }

  getEnseignants(): void {
    this.memberService.getAllMembers()
      .then(enseignants => this.enseignants = enseignants.filter(({ type }) =>
        type === 'enseignant',
        console.log(this.enseignants),
      ));

  }


  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }

  ngOnInit(): void {
this.getEtudiants();
this.getEnseignants();
    this.fetchDataSource();
  /*  if(this.Vetudiant!=null){
    this.memberService.getMemberById(this.Vetudiant).then(item => {
      this.item = item;
      console.log(item);


    });}
*/



      this.initForm(null);

  }

  private initForm(item: Member): void {

    this.form = new FormGroup({
      etudiant: new FormControl(item, []),
      encadrant: new FormControl(item, []),
      //  type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
    });
  }

  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };
    console.log(this.selectedData);
  }

  onSubmit(): void {

    this.memberService.affecterencadrantToetudiant(this.Vetudiant,this.Vencadrant).then(() => this.getEtudiants());
    //const objectToSubmit: Member = {...this.item, ...this.form.value, type: this.type_mbr};
console.log(this.Vencadrant,this.Vetudiant);


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


}
