import { Component, OnInit } from '@angular/core';
import {GLOBAL} from "../app-config";
import {MemberService} from "../../services/member.service";
import {Member} from "../../models/member.model";
import {Subject} from "rxjs";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Pub} from "../../models/pub.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'cv', 'encadrant', 'actions'];
  dataSource: Member[] = [];
  form: FormGroup;
  item: Member;
  filter='';
  Vencadrant: any;
  enseignants: Member[] = [];

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


  ngOnInit(): void {
    this.fetchDataSource();
    this.getEnseignants();
this.initForm(null);
  }

  fetchDataSource(): void {
    this.filter='';
    this.initForm(null);
    this.Vencadrant=null;
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
    this.filter='etd'
    this.initForm(null);
    this.Vencadrant=null;
    this.memberService.getAllMembers()
      .then(etudiants => this.dataSource = etudiants.filter(({ type }) =>
        type === 'etudiant',

      ));
  }

  filterEns() {
    this.filter='ens'
    this.initForm(null);
    this.Vencadrant=null;
    this.memberService.getAllMembers()
      .then(enseignants => this.dataSource = enseignants.filter(({ type }) =>
        type === 'enseignant',

      ));


  }
  getEnseignants(): void {
    this.memberService.getAllMembers()
      .then(enseignants => this.enseignants = enseignants.filter(({ type }) =>
        type === 'enseignant',
        console.log(this.enseignants),
      ));

  }



  private initForm(item: Member): void {

    this.form = new FormGroup({
      //Member
      cin: new FormControl(item?.cin, []),
      nom: new FormControl(item?.nom, []),
      prenom: new FormControl(item?.prenom, []),

      //Etudiant
      diplome: new FormControl(item?.diplome, []),
      encadrant: new FormControl(item?.encadrant.id, []),
      //Enseignant
      etablissement: new FormControl(item?.etablissement, []),
      grade: new FormControl(item?.grade, []),
    });
  }



  onSubmit(): void {

    this.ResearchMember();

  }

  ResearchMember() {

this.item=this.form.value;
    if (this.item!=null) {
      if (this.item.nom?.trim()== "") {
        this.item.nom = null;
      }
      if (this.item.prenom?.trim() == "") {
        this.item.prenom = null;
      }
      if (this.item.cin?.trim() == "") {
        this.item.cin = null;
      }

      if (this.item.diplome?.trim()== "") {
        this.item.diplome = null;
      }
      if (this.item.etablissement?.trim()== "") {
        this.item.etablissement = null;
      }
      if (this.item.grade?.trim()== "") {
        this.item.grade = null;
      }


      if (this.item.cin != null && this.item.nom == null && this.item.prenom == null) {
        this.memberService.getMemberByCin(this.item.cin).then(data => {
          this.dataSource=[];
          if(data!=null){
          this.dataSource[0] = data;}
          console.log(this.dataSource);
        });
      }

      if (this.item.cin == null && this.item.nom != null && this.item.prenom == null) {
        this.memberService.getMemberByNom(this.item.nom).then(data => {
          this.dataSource = data;

          console.log(this.dataSource);
        });
      }
      if (this.item.cin == null && this.item.nom == null && this.item.prenom != null) {
        this.memberService.getMemberByPrenom(this.item.prenom).then(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      }
        if (this.item.cin == null && this.item.nom != null && this.item.prenom != null) {
          this.memberService.getMemberByNomAndPrenom(this.item.nom, this.item.prenom).then(data => {
            this.dataSource = data;
            console.log(this.dataSource);
          });
        }

      if (this.item.cin == null && this.item.nom == null && this.item.prenom == null && this.item.diplome!=null) {
        this.memberService.getMemberByDiplome(this.item.diplome).then(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      }
      if (this.item.cin == null && this.item.nom == null && this.item.prenom == null && this.item.diplome==null && this.item.encadrant!=null) {
        this.memberService.getByEncadrant(this.Vencadrant).then(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      }

      if (this.item.cin == null && this.item.nom == null && this.item.prenom == null && this.item.etablissement==null && this.item.grade!=null) {
        this.memberService.getMemberByGrade(this.item.grade).then(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      }

      if (this.item.cin == null && this.item.nom == null && this.item.prenom == null && this.item.etablissement!=null && this.item.grade==null) {
        this.memberService.getMemberByEtablissement(this.item.etablissement).then(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      }

      if (this.item.cin == null && this.item.nom == null && this.item.prenom == null && this.item.etablissement!=null && this.item.grade!=null) {
        this.memberService.getMemberByGradeAndEtablissement(this.item.grade, this.item.etablissement).then(data => {
          this.dataSource = data;
          console.log(this.dataSource);
        });
      }

    }
  }}
