import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Allorders } from 'src/app/shared/interfaces/allorders';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EcommerceDataService } from 'src/app/shared/services/ecommerce-data.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'true',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      state(
        'false',
        style({
          height: '0',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition(
        'true <=> false',
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)')
      ),
    ]),
  ],
})
export class AllordersComponent implements OnInit {
  userData: any;
  allorders: Allorders[] = [];
  showMoreDetails: boolean[] = [];

  constructor(
    private _EcommerceDataService: EcommerceDataService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this._AuthService.decodeUserData();
    console.log(this.userData.id);

    this._EcommerceDataService.getAllorder(this.userData.id).subscribe({
      next: (res) => {
        this.allorders = res;
        this.showMoreDetails = new Array(res.length).fill(false);
        console.log(this.allorders);
        this._EcommerceDataService.ordersNumber.next(this.allorders.length);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  toggleDetails(index: number) {
    this.showMoreDetails[index] = !this.showMoreDetails[index];
  }
}
