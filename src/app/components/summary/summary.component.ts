import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { reset } from '@store/actions/form.actions';
import { PageService } from '@services/page.service';
import { Subscription } from 'rxjs';

import Page from '@models/page';
import { extractQuestions } from '@utils/page-utils';
import Question from '@models/question';
import { UITypesEnum } from 'app/shared/enums/ui-types';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  questions: Question[];
  hasSubmitted: boolean = false;

  private form: any = {};
  private subscriptions: Subscription[] = [];

  constructor(
    private _store: Store<{ form: any }>,
    private _location: Location,
    private _router: Router,
    private _pageService: PageService
  ) { }

  ngOnInit(): void {
    this._pageService.getAllPages().subscribe((pages: Page[]) => {
      this.questions = extractQuestions(pages);
      const storeSub = this._store.select('form').subscribe(val => {
        this.form = val.form;
      })

      this.subscriptions.push(storeSub);
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  getAnswer (q: Question): string {
    const val = this.form[q.questionId];
    const options = {
      [UITypesEnum.Label]: q.label,
      [UITypesEnum.Checkbox]: val ? `${q.label} ✅ ` : '',
      [UITypesEnum.Textbox]: val ? `${q.label}: ${val}` : '',
      [UITypesEnum.RadioGroup]: val ? `${q.label}: ${val}`: ''
    }

    return options[q.ui];
  }

  goBack (): void {
    this._location.back();
  }

  submit (): void {
    alert('We received your application!');
    this.hasSubmitted = true;
  }

  startOver (): void {
    this._store.dispatch(reset());
    this._router.navigateByUrl('/');
  }

}
