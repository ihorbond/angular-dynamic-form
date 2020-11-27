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
    const pageIdx = data.findIndex(x => x.PageID === pageId);
    const normalized = normalizeData<Page>(data[pageIdx]);
    normalized.pageNum = pageIdx + 1;
    normalized.totalPages = data.length;

    return of(normalized);
  }

  getAllPages (): Observable<Page[]> {
    const pages = data.map(normalizeData) as Page[];
    return of(pages);
  }

  getInitialPageId (): Observable<number> {
    return of(data[0].PageID);
  }

}
