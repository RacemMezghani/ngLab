import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../models/member.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  item: Member;
  form: FormGroup;
  type_mbr: string=null;
  dataSource: Member[] = [];
  dataSource1: Member[] = [];
  i: number=0;
  selected: any;
  private selectedData: { text: string; value: any };


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

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        console.log(item);

        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Member): void {

    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      cv: new FormControl(item?.cv, []),
      photo: new FormControl(item?.photo, []),
      email: new FormControl(item?.email, []),
      password: new FormControl(item?.password, []),
      dateNaissance: new FormControl(item?.dateNaissance, []),
      dateInscription: new FormControl(item?.dateInscription, []),
      sujet: new FormControl(item?.sujet, []),
      diplome: new FormControl(item?.diplome, []),
      etablissement: new FormControl(item?.etablissement, []),
      grade: new FormControl(item?.grade, []),
      encadrant: new FormControl(item?.encadrant, []),
      //  type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
    });
  }



  onSubmit(): void {
    console.log('new ' +this.type_mbr);
    /* if(this.item.encadrant==null && this.item.type=='etudiant' && this.selectedData.value!=null){
          this.memberService.affecterencadrantToetudiant(this.item.id, this.selectedData.value).then(item => {
            console.log(item);

          });}*/

    if(this.type_mbr!=null){const objectToSubmit: Member = {...this.item, ...this.form.value, type: this.type_mbr};
      console.log(objectToSubmit);
      this.memberService.saveMember(objectToSubmit).then(() => this.router.navigate(['./members']));}
    else{const objectToSubmit: Member = {...this.item, ...this.form.value};
      console.log(objectToSubmit);
      this.memberService.saveMember(objectToSubmit).then(() => this.router.navigate(['./members']));}
    //const objectToSubmit: Member = {...this.item, ...this.form.value, type: this.type_mbr};



  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
      text: event.source.triggerValue
    };
    console.log(this.selectedData);
  }
}
