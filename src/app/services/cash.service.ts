import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const TRANSACTION_KEY = 'transactions';
const SELECTED_CURENCY_KEY = 'selected-currency';

export enum CashFlow {
  expense = 0,
  income = 1,
}

export interface Transaction {
  createdAt: number;
  title: string;
  value: number;
  notes: string;
  type: CashFlow;
  category: {
    name: string;
    icon: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CashService {
  constructor(private storage: Storage) {}

  getCategories() {
    return [
      { name: 'Food', icon: 'pizza' },
      { name: 'Rent', icon: 'business' },
      { name: 'Shopping', icon: 'cart' },
      { name: 'Sports', icon: 'fitness' },
      { name: 'Education', icon: 'school' },
      { name: 'Travel', icon: 'airplane' },
    ];
  }

  async addTransaction(transaction: Transaction) {
    const transactions = await this.getTransactions();
    transactions.push(transaction);
    return this.storage.set(TRANSACTION_KEY, transactions);
  }

  getTransactions(): Promise<Transaction[]> {
    return this.storage.get(TRANSACTION_KEY).then((res) => {
      if (res) {
        return res.sort(
          (trans: Transaction, trans2: Transaction) =>
            trans2.createdAt - trans.createdAt
        );
      } else {
        return [];
      }
    });
  }

  async getGroupedTransactions() {
    const transactions = await this.getTransactions();

    const resultObject = {};

    for (const trans of transactions) {
      if (resultObject[trans.category.name]) {
        resultObject[trans.category.name].transactions.push(trans);
      } else {
        resultObject[trans.category.name] = {
          icon: trans.category.icon,
          transactions: [trans],
        };
      }
    }

    const result = [];

    Object.keys(resultObject).forEach((cat) => {
      result.push({
        category: cat,
        icon: resultObject[cat].icon,
        transactions: resultObject[cat].transactions,
      });
    });

    return result;
  }

  updateTransactions(transactions) {
    return this.storage.set(TRANSACTION_KEY, transactions);
  }

  async getSelectedCurrency() {
    return this.storage.get(SELECTED_CURENCY_KEY);
  }

  updateCurrency(selected) {
    return this.storage.set(SELECTED_CURENCY_KEY, selected);
  }

  clearData() {
    return this.storage.clear();
  }

  resetIntro() {
    return this.storage.remove('seen-intro');
  }
}
