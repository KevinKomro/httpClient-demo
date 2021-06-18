import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../customer.service';
import {Customer} from '../customer';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  updateCustomerForm: FormGroup;
  id: number;
  customer: Customer = new Customer;
  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomer();
    this.updateCustomerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      city: [''],
      country: [''],
      title: ['']
    });
  }
   
  getCustomer() {
    this.route.params.subscribe(data => this.id = +(data.id));

    // FIXME - this needs to be invoked differently once the service returns an Observable as expected.
    this.customerService.getCustomer(this.id).subscribe(customer => this.customer = customer);
  }

  updateCustomer() {

    this.route.params.subscribe(data => this.id = +(data.id));

    if (this.updateCustomerForm.valid) {
      this.customerService.updateCustomer(this.id, this.updateCustomerForm.value).subscribe(_ => this.router.navigate([`/details/${this.id}`]));
    } else {
      console.log('Fail.');
    }
  }

}
