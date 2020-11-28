import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Question from '../../shared/models/question';
import { UITypesEnum } from '../../shared/enums/ui-types';

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
