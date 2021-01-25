import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Pub} from "../../models/pub.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Member} from "../../models/member.model";
import {MemberService} from "../../services/member.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../@root/confirm-dialog/confirm-dialog.component";
import {takeUntil} from "rxjs/operators";
import {Event} from "../../models/event.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./bootstrap.min.css','./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  currentItemId: string;
  item: Event;
  form: FormGroup;
  dataSource: Event[] = [];

  selected: any;
  private selectedData: { text: string; value: any };


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {

  }
  fetchDataSource(): void {
    this.memberService.getAllEvents().then(data => {
      this.dataSource = data;

    });
  }



  ngOnInit(): void {

    this.fetchDataSource();

    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getEventById(this.currentItemId).then(item => {
        this.item = item;
        console.log(item);

        this.initForm(item);
      });
    } else {
      this.initForm(null);
    }
  }

  private initForm(item: Event): void {

    this.form = new FormGroup({
      titre: new FormControl(item?.titre, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
      dateEvent: new FormControl(item?.dateEvent, []),
    });
  }



  onSubmit(): void {
    const objectToSubmit: Event = {...this.item, ...this.form.value};
    console.log(objectToSubmit);
    this.memberService.saveEvent(objectToSubmit).then(() => this.router.navigate(['./events']));
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
