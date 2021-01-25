import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {Member} from "../../models/member.model";
import {Pub} from "../../models/pub.model";
import {Tool} from "../../models/tool.model";
import {Event} from "../../models/event.model";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private _item: string = "";
  private _item1: string = "";

  member: Member;
  members: Member[]=[];
  pubs: Pub[]=[];
  tools: Tool[]=[];
  events: Event[]=[];

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               private memberService: MemberService) { this.fetchDataSource1();
    this.fetchDataSource2();this.fetchDataSource3();this.fetchDataSource4();}

  ngOnInit(): void {

  }

  fetchDataSource1(): void {

    this.memberService.getAllMembers().then(data => {
      this.members = data;
    });}
  fetchDataSource2(): void {

    this.memberService.getAllPub().then(data => {
      this.pubs = data['_embedded']['publicationBeanList'];

    });}
  fetchDataSource3(): void {
    this.memberService.getAllTools().then(data => {
      this.tools = data['_embedded']['toolBeanList'];
    }); }
  fetchDataSource4(): void {
    this.memberService.getAllEvents().then(data => {
      this.events= data['_embedded']['eventBeanList'];
    });
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
  logout(){
    this.member=null;
    localStorage.clear();
    console.log('logout');
  }

}
