import { Component, OnInit } from '@angular/core';
import {MemberService} from "../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member} from "../../models/member.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";


@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./bootstrap.min.css','./member-login.component.scss',
    ]
})
export class MemberLoginComponent implements OnInit {

  currentItemId: string;
  member: Member;
  form: FormGroup;
  type_mbr: string=null;
  dataSource: Member[] = [];
  dataSource1: Member[] = [];
  i: number=0;
  selected: any;
  private _item: string = "";
  private _item1: string = "";
  msg= '';
  types: string[] = ['etudiant', 'enseignant'];
  private selectedData: { text: string; value: any };

  hide = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {this.type_mbr=this.activatedRoute.snapshot.paramMap.get('type');

  }
  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;

    });
  }

  a(): void{

    this.memberService.getAllMembers().then(data => {
      this.dataSource = data;
      for (let m of this.dataSource){
        if(m.type=='enseignant'){
          this.dataSource1[this.i]=m;
          this.i++;

        }
      }
      console.log(this.dataSource1);

    });

  }

  ngOnInit(): void {
    this.a();
    this.fetchDataSource();
    this.initForm(null);

  }

  private initForm(item: Member): void {

    this.form = new FormGroup({

      cin: new FormControl(item?.cin, []),
      nom: new FormControl(item?.nom, []),
      prenom: new FormControl(item?.prenom, []),
      cv: new FormControl(item?.cv, []),
      photo: new FormControl(item?.photo, []),
      email: new FormControl(item?.email, [Validators.required]),
      password: new FormControl(item?.password, [Validators.required]),
      dateNaissance: new FormControl(item?.dateNaissance, []),
      dateInscription: new FormControl(item?.dateInscription, []),
      sujet: new FormControl(item?.sujet, []),
      diplome: new FormControl(item?.diplome, []),
      etablissement: new FormControl(item?.etablissement, []),
      grade: new FormControl(item?.grade, []),
      encadrant: new FormControl(item?.encadrant, []),
    });
  }



  onSubmit(): void {
    this.login();

  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }



  set item(value) {
    this._item = value;
    this.memberService.localItem = value;
  }

  get item() {
    return this._item = this.memberService.localItem;
  }

  set item1(value) {
    this._item1 = value;
    this.memberService.localItem1 = value;
  }

  get item1() {
    return this._item1 = this.memberService.localItem1;
  }



  login() {
    localStorage.clear();


    this.member=this.form.value;
    console.log(this.member);

    this.memberService.login(this.member).then(
      data=> {console.log("response recieved"),
        localStorage.setItem('mail', this.member.email),
        this.memberService.getMemberByEmail(this.member.email).then(
          data => {
            this.member = data;
            if (this.member!=null){
              this.item=this.member.id;
              this.item1=this.member.prenom+' '+this.member.nom;
              this.router.navigate(['member',this.item,'profile'])
            }
            console.log(this.member);});

      },
      error => {console.log("exception occured"),
        this.msg='Bad credentials, please enter valid email and password'}
    );



  }


}
