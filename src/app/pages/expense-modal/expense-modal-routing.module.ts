import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseModalPage } from './expense-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseModalPageRoutingModule {}
