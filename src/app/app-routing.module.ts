import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    path:'',
    redirectTo: 'pages/172',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
