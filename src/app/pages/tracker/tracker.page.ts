import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from './../expense-modal/expense-modal.page';
import { CashService, Transaction } from 'src/app/services/cash.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  transactions: Transaction[] = [];
  selectedCurrency = '';
  selectedView = 'grouped';
  transactionGroups = [];

  constructor(
    private modalCtrl: ModalController,
    private cashService: CashService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadTransactions();
  }

  async loadTransactions() {
    this.transactions = await this.cashService.getTransactions();

    this.transactionGroups = await this.cashService.getGroupedTransactions();

    this.selectedCurrency = (
      await this.cashService.getSelectedCurrency()
    ).toUpperCase();
  }

  async trackExpense() {
    const modal = await this.modalCtrl.create({
      component: ExpenseModalPage,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();

    if (data && data.reload) {
      this.loadTransactions();
    }
  }

  async removeTransaction(index: number) {
    this.transactions.splice(index, 1);
    await this.cashService.updateTransactions(this.transactions);
    this.loadTransactions();
  }
}
