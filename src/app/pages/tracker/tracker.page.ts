import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpenseModalPage } from './../expense-modal/expense-modal.page';
import {
  CashFlow,
  CashService,
  Transaction,
} from 'src/app/services/cash.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  transactions: Transaction[] = [];
  selectedCurrency = '';
  selectedView = 'all';
  transactionGroups = [];
  balance: number = 0;
  balanceColor: string = '';

  constructor(
    private modalCtrl: ModalController,
    private cashService: CashService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadTransactions();
  }

  async loadTransactions() {
    this.balance = 0;
    this.transactions = await this.cashService.getTransactions();

    this.transactionGroups = await this.cashService.getGroupedTransactions();

    this.selectedCurrency = (
      await this.cashService.getSelectedCurrency()
    ).toUpperCase();

    this.transactions.forEach((transaction) => {
      if (transaction.type === CashFlow.income) {
        console.log(transaction.type);
        this.balance += transaction.value;
      } else {
        console.log(transaction.type);
        this.balance -= transaction.value;
      }
    });

    switch (true) {
      case this.balance < 100:
        this.balanceColor = 'danger';
        break;
      case this.balance < 250:
        this.balanceColor = 'warning';
        break;
      case this.balance < 500:
        this.balanceColor = 'primary';
        break;
      default:
        this.balanceColor = 'success';
        break;
    }
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
