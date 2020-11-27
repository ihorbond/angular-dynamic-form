import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { reset } from 'src/app/store/actions/form.actions';
import { PageService } from 'src/app/core/services/page.service';
import { Subscription } from 'rxjs';

import Page from 'src/app/shared/models/page';
import { extractQuestions } from 'src/app/shared/utilities';
import Question from 'src/app/shared/models/question';

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
      'lb': q.label,
      'cb': val ? `${q.label} ✅ ` : '',
      'tb': val ? `${q.label}: ${val}` : '',
      'rbil': val ? `${q.label}: ${val}`: ''
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
