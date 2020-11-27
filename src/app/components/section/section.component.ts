import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';
import Section from 'src/app/shared/models/section';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() section: Section;
  constructor(private _formService: FormService) { }

  ngOnInit(): void {
    this.form = this._formService.toFormGroup(this.section.questions);
  }

}
