import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Member} from "../../models/member.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSelectChange} from "@angular/material/select";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {Pub} from "../../models/pub.model";

@Component({
  selector: 'app-affecter-pub-to-member',
  templateUrl: './affecter-pub-to-member.component.html',
  styleUrls: ['./affecter-pub-to-member.component.scss']
})
export class AffecterPubToMemberComponent implements OnInit {

  displayedColumns: string[] = ['Mbr', 'Pub'];
  members: Member[] = [];
  pubs: Pub[] = [];


  item: Member;
  form: FormGroup;
  private selectedData: { text: string; value: any };

  Vpub: any;
  Vmember: any;
  msg='';



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,

  ) {
  }



  fetchDataSource2(): void {

    this.memberService.getAllPub().then(data => {
      this.pubs = data['_embedded']['publicationBeanList'];

  })}

  fetchDataSource(): void {
    this.memberService.getAllMembers().then(data => {
      this.members = data;
      console.log(this.members);
    });
  }

  ngOnInit(): void {

    this.fetchDataSource();
    this.fetchDataSource2();
    this.initForm(null);

  }

  private initForm(item: Member): void {

    this.form = new FormGroup({
      member: new FormControl(item, []),
      pub: new FormControl(item, []),
      //  type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
    });
  }



  onSubmit(): void {

    this.memberService.affecterAutToPub(this.Vmember,this.Vpub).then(() => this.fetchDataSource());
    //const objectToSubmit: Member = {...this.item, ...this.form.value, type: this.type_mbr};
    console.log(this.Vmember,this.Vpub);
    this.msg='operation effectué avec succes';


  }



}
