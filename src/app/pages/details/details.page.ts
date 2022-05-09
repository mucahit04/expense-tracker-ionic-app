import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/services/cash.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  transaction: Transaction;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((_) => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state);
        this.transaction =
          this.router.getCurrentNavigation().extras.state.transaction;
      }
    });
  }

  ngOnInit() {}
}
