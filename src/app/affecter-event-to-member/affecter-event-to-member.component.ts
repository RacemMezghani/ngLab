import { Component, OnInit } from '@angular/core';
import {Member} from "../../models/member.model";
import {Pub} from "../../models/pub.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {Event} from "../../models/event.model";

@Component({
  selector: 'app-affecter-event-to-member',
  templateUrl: './affecter-event-to-member.component.html',
  styleUrls: ['./affecter-event-to-member.component.scss']
})
export class AffecterEventToMemberComponent implements OnInit {

  displayedColumns: string[] = ['Mbr', 'Ev'];
  members: Member[] = [];
  events: Event[] = [];


  item: Member;
  form: FormGroup;


  Vevent: any;
  Vmember: any;
msg='';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,

  ) {
  }



  fetchDataSource2(): void {

    this.memberService.getAllEvents().then(data => {
      this.events = data['_embedded']['eventBeanList'];

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
      event: new FormControl(item, []),
      //  type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
    });
  }



  onSubmit(): void {

    this.memberService.affecterMembreToEvent(this.Vmember,this.Vevent).then(() => this.fetchDataSource());
    //const objectToSubmit: Member = {...this.item, ...this.form.value, type: this.type_mbr};
    console.log(this.Vmember,this.Vevent);
    this.msg='operation effectué avec succes';


  }


}
