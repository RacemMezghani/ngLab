import { Component, OnInit } from '@angular/core';
import {Member} from "../../models/member.model";
import {Event} from "../../models/event.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {Tool} from "../../models/tool.model";

@Component({
  selector: 'app-affecter-tool-to-member',
  templateUrl: './affecter-tool-to-member.component.html',
  styleUrls: ['./affecter-tool-to-member.component.scss']
})
export class AffecterToolToMemberComponent implements OnInit {

  displayedColumns: string[] = ['Mbr', 'Tool'];
  members: Member[] = [];
  tools: Tool[] = [];


  item: Member;
  form: FormGroup;


  Vtool: any;
  Vmember: any;
msg='';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,

  ) {
  }



  fetchDataSource2(): void {

    this.memberService.getAllTools().then(data => {
      this.tools = data['_embedded']['toolBeanList'];

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
      tool: new FormControl(item, []),
      //  type_mbr: new FormControl(item?.type_mbr, [Validators.required]),
    });
  }



  onSubmit(): void {

    this.memberService.affecterMembreToTool(this.Vmember,this.Vtool).then(() => this.fetchDataSource());
    //const objectToSubmit: Member = {...this.item, ...this.form.value, type: this.type_mbr};
    console.log(this.Vmember,this.Vtool);
    this.msg='operation effectué avec succes';



  }


}
