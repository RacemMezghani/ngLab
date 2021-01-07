import { Component, OnInit } from '@angular/core';
import {Member} from "../../models/member.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatSelectChange} from "@angular/material/select";
import { Pub } from 'src/models/pub.model';

@Component({
  selector: 'app-pub-form',
  templateUrl: './pub-form.component.html',
  styleUrls: ['./pub-form.component.scss']
})
export class PubFormComponent implements OnInit {

  currentItemId: string;
  item: Pub;
  form: FormGroup;
  dataSource: Pub[] = [];

  selected: any;
  private selectedData: { text: string; value: any };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {

  }
  fetchDataSource(): void {
    this.memberService.getAllPub().then(data => {
      this.dataSource = data;

    });
  }



  ngOnInit(): void {

    this.fetchDataSource();

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getPubById(this.currentItemId).then(item => {
        this.item = item;
        console.log(item);

        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Pub): void {

    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      type: new FormControl(item?.type, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, []),
      dateApparition: new FormControl(item?.dateApparition, []),
     });
  }



  onSubmit(): void {
    const objectToSubmit: Member = {...this.item, ...this.form.value};
      console.log(objectToSubmit);
      this.memberService.savePub(objectToSubmit).then(() => this.router.navigate(['./tools']));
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
