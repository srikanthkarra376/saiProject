import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ENV} from '../../core/env.config'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  private paymentHandler: any = null;
  public paymentMessageShown: boolean = false;
  public paymentMessageSuccess: boolean = false;
  public paymentMessageText: string = '';
  public productList: any[] = [
    {
      name: 'Small plan',
      amount: 25,
      description: 'Small plan description description',
      currency: 'USD',
    },
    {
      name: 'Premium plan',
      amount: 40,
      description: 'Premium plan description',
      currency: 'USD',
    },
    {
      name: 'Platinum plan',
      amount: 100,
      description: 'Premium plan description',
      currency: 'USD',
    },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.invokeStripe();
  }

  public initializePayment(product: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MbuQSHIuowrtSuobSD7aUOl4t1yWZpmqikfo5DaS7xZi3K2A9LxEfznnRSAx6wtF8oKcgs7PBBkozweLwFXJg8i00LXzqqRcR',
      locale: 'auto',
      token: (stripeToken:any) => {
        this.processPayment(product, stripeToken);
      },
    });

    paymentHandler.open({
      name: product.name,
      description: 'Charge with stripe api',
      amount: product.amount * 100,
    });
  }

  private processPayment(product: any, stripeToken: any) {
    this.http.post(ENV.API_HOST_1_URL+'/api2/payment', {
        description: product.description,
        amount: product.amount * 100,
        currency: product.currency,
        stripeToken: stripeToken.id,
      })
      .subscribe(
        (data) => {
          this.paymentMessageShown = true;
          this.paymentMessageSuccess = true;
          this.paymentMessageText = 'Payment was successfull';
          setTimeout(() => {
            this.paymentMessageShown = false;
          }, 4000);
        },
        (error) => {
          this.paymentMessageShown = true;
          this.paymentMessageSuccess = false;
          this.paymentMessageText = error.error.message;
          setTimeout(() => {
            this.paymentMessageShown = false;
          }, 4000);
        }
      );
  }

  private invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MbuQSHIuowrtSuobSD7aUOl4t1yWZpmqikfo5DaS7xZi3K2A9LxEfznnRSAx6wtF8oKcgs7PBBkozweLwFXJg8i00LXzqqRcR',
          locale: 'auto',
        });
      };
      window.document.body.appendChild(script);
    }
  }
}