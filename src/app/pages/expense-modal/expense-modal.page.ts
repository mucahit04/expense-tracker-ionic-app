import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {
  CashFlow,
  CashService,
  Transaction,
} from 'src/app/services/cash.service';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.page.html',
  styleUrls: ['./expense-modal.page.scss'],
})
export class ExpenseModalPage implements OnInit {
  categories = this.cashService.getCategories();
  createdAt = new Date().toISOString();
  transaction: Transaction = {
    createdAt: Date.now(),
    title: '',
    notes: '',
    value: 0,
    type: CashFlow.expense,
    category: this.categories[0],
  };
  constructor(
    private cashService: CashService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

  async addTransaction() {
    this.transaction.createdAt = new Date(this.createdAt).getTime();
    this.transaction.type = +this.transaction.type;

    if (this.transaction.type === CashFlow.income) {
      this.transaction.category = { name: 'Income', icon: 'cash' };
    }

    await this.cashService.addTransaction(this.transaction);
    const toast = await this.toastCtrl.create({
      message: 'Transaction saved',
      duration: 2000,
    });

    await toast.present();
    this.modalCtrl.dismiss({ reload: true });
  }
}
