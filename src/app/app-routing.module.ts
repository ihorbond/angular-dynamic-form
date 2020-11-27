import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PageComponent } from './components/page/page.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  {
    path: 'pages/:id',
    component: PageComponent
  },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: '',
    component: AppComponent
  },
  {
    path:'**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
