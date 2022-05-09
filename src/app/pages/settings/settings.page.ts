import { Component, OnInit } from '@angular/core';
import { CashService } from 'src/app/services/cash.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currency = '';

  constructor(
    private cashService: CashService,
    private toatsCtrl: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currency = await this.cashService.getSelectedCurrency();
  }

  async updateCurrency() {
    await this.cashService.updateCurrency(this.currency);
    const toast = await this.toatsCtrl.create({
      message: 'Currency updated',
      duration: 2000,
    });
    toast.present();
  }

  async clearData() {
    await this.cashService.clearData();
    const toast = await this.toatsCtrl.create({
      message: 'All data deleted!',
      duration: 2000,
    });
    await toast.present();
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }

  async showIntro() {
    await this.cashService.resetIntro();
    this.router.navigateByUrl('/intro', { replaceUrl: true });
  }
}
