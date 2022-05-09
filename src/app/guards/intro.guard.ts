import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class IntroGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const introSeen = await this.storage.get('seen-intro');

    if (!introSeen) {
      this.router.navigateByUrl('/intro');
    }
    return introSeen;
  }
}
