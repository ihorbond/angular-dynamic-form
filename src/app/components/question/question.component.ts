import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Question from 'src/app/shared/models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void { }

  get isInvalid(): boolean {
    const id = this.question.questionId.toString();
    return this.question.ui !== 'lb' && this.form.get(id).invalid;
  }

}
