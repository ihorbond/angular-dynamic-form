import { Injectable } from "@angular/core";
import Question from 'src/app/shared/models/question';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: "root"
})
export class FormService {
  toFormGroup(questions: Question[]): FormGroup {
    const group = questions
      .filter(x => x.ui !== 'lb')
      .reduce((group, question) => {
        group[question.questionId] = question.isRequired
          ? new FormControl({ value: null, disabled: !question.isActive }, Validators.required)
          : new FormControl({ value: null, disabled: !question.isActive });
        return group;
    }, {});

    return new FormGroup(group);
  }
}
