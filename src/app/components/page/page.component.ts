import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PageService } from 'src/app/core/services/page.service';
import Page from 'src/app/shared/models/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  page: Page;

  constructor(
    private _location: Location,
    private _activeRoute: ActivatedRoute,
    private _pageService: PageService
  ) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      const pageId = Number(params.id);
      this._pageService.getPage(pageId).subscribe((res: Page) => {
        this.page = res;
      })
    })
  }

  get isLastPage () {
    return this.page.nextPageId === 0
  }

  goBack () {
    this._location.back()
  }

}
