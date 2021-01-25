import { Component, OnInit } from '@angular/core';
import {Event} from "../../models/event.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatSelectChange} from "@angular/material/select";
import {Tool} from "../../models/tool.model";

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./bootstrap.min.css','./tool-form.component.scss']
})
export class ToolFormComponent implements OnInit {

  currentItemId: string;
  item: Tool;
  form: FormGroup;
  dataSource: Tool[] = [];

  selected: any;
  private selectedData: { text: string; value: any };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {

  }
  fetchDataSource(): void {
    this.memberService.getAllTools().then(data => {
      this.dataSource = data;

    });
  }



  ngOnInit(): void {

    this.fetchDataSource();

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getToolById(this.currentItemId).then(item => {
        this.item = item;
        console.log(item);

        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Tool): void {

    this.form = new FormGroup({
      nom: new FormControl(item?.nom, [Validators.required]),
      source: new FormControl(item?.source, [Validators.required]),
      date: new FormControl(item?.date, []),
    });
  }



  onSubmit(): void {
    const objectToSubmit: Tool = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveTool(objectToSubmit).then(() => this.router.navigate(['./tools']));
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
