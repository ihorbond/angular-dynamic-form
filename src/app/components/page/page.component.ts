import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import Page from '../../shared/models/page';
import { PageService } from '../../core/services/page.service';
import { FormService } from '../../core/services/form.service';
import { save } from '../../store/actions/form.actions';
import { extractQuestions } from '../../shared/utilities/page-utils';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  page: Page;
  form: FormGroup;

  private subscriptions: Subscription[];

  constructor(
    private _location: Location,
    private _activeRoute: ActivatedRoute,
    private _pageService: PageService,
    private _formService: FormService,
    private _store: Store<{ form: any }>
  ) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      const pageId = Number(params.id);
      this._pageService.getPage(pageId).subscribe(this.onGetPage.bind(this));
    })
  }

  ngOnDestroy (): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get isFirstPage (): boolean {
    return this.page.pageNum === 1;
  }

  get nextPageUrl (): string {
    return this.page.nextPageId === 0
      ? '/summary'
      : `/pages/${this.page.nextPageId}`;
  }

  get progress (): number {
    return this.page.pageNum / this.page.totalPages;
  }

  goBack (): void {
    this._location.back();
  }

  private onGetPage (page: Page): void {
    this.page = page;
    const questions = extractQuestions([this.page]);
    this.form = this._formService.toFormGroup(questions);

    const storeSub = this._store.select('form').subscribe(val => {
      this.form.patchValue(val.form, { emitEvent: false });
    })

    const formSub = this.form.valueChanges.subscribe(val => {
      this._store.dispatch(save({ form: val }));
    })

    this.subscriptions = [storeSub, formSub];
  }

}
