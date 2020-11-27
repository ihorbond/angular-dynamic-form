import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { normalizeData } from 'src/app/shared/utilities'
import Page from 'src/app/shared/models/page';

import data from "src/assets/data/form.json";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  getPage (pageId: number): Observable<Page> {
    const page = data.find(x => x.PageID === pageId);
    const normalized = normalizeData<Page>(page);
    return of(normalized);
  }

  getAllPages (): Observable<Page[]> {
    const pages = data.map(normalizeData) as Page[];
    return of(pages);
  }
}
