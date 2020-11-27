import { Injectable } from "@angular/core";
import Question from 'src/app/shared/models/question';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UITypesEnum } from 'src/app/shared/enums/ui-types';

@Injectable({
  providedIn: "root"
})
export class FormService {
  toFormGroup(questions: Question[]): FormGroup {
    const group = questions
      .filter(x => x.ui !== UITypesEnum.Label)
      .reduce((group, question) => {
        group[question.questionId] = question.isRequired
          ? new FormControl({ value: null, disabled: !question.isActive }, Validators.required)
          : new FormControl({ value: null, disabled: !question.isActive });
        return group;
    }, {});

    return new FormGroup(group);
  }
}
