import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpenseModalPageRoutingModule } from './expense-modal-routing.module';

import { ExpenseModalPage } from './expense-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseModalPageRoutingModule
  ],
  declarations: [ExpenseModalPage]
})
export class ExpenseModalPageModule {}
