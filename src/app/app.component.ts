import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from './core/services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _pageService: PageService,
    private _router: Router
  ) {
    this._pageService.getInitialPageId().subscribe(pageId => {
      this._router.navigateByUrl(`/pages/${pageId}`);
    })
  }

}
