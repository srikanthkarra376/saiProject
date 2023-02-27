import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripeRoutingModule } from './stripe-routing.module';
import { CancelComponent } from './cancel/cancel.component';
import { SuccessComponent } from './success/success.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    CancelComponent,
    SuccessComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    StripeRoutingModule
  ]
})
export class StripeModule { }
