import { Component, OnInit } from '@angular/core';
import {Member} from "../../models/member.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatSelectChange} from "@angular/material/select";
import {Pub} from "../../models/pub.model";
import {Tool} from "../../models/tool.model";
import {Event} from "../../models/event.model";

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss','./bootstrap.min.css']
})
export class MemberProfileComponent implements OnInit {

  currentItemId: string;
  item: Member;
  form: FormGroup;
  pubs: Pub[]=[];
  tools: Tool[]=[];
  events: Event[]=[];
  etudiants: Member[]=[];

  displayedColumns: string[] = ['actions'];



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {

  }


  ngOnInit(): void {



    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        console.log(item);

      });

      this.memberService.getByEncadrant(this.currentItemId).then(data => {
        this.etudiants = data;
        console.log(data);

      });


      this.memberService.getToolByMember(this.currentItemId).then(data => {
if(data!=null){this.tools = data;
  console.log(this.tools);}

        },
        errors=>{console.log('exception')});

      this.memberService.pubByMember(this.currentItemId).then(data => {
          if(data!=null){  this.pubs = data;
            console.log(this.pubs);}

        },
        errors=>{console.log('exception')});

      this.memberService.getEventByMember(this.currentItemId).then(data => {
          if(data!=null){this.events = data;
            console.log(this.events);}

        },
        errors=>{console.log('exception')});
    }


  }



  onSubmit(): void {

  }

  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }
}
