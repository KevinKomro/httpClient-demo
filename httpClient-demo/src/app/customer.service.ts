import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Customer} from './customer';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  getCustomer(id: number): Observable<Customer> {
    // TODO - Send a request to the API to get the correct Customer data using the httpClient. This method should return an Observable!
    
    return this.httpClient.get<Customer>('http://127.0.0.1:3000/customers/' +id).pipe(
      tap(data => {
        console.log('fetched customer');
      }),
      catchError(this.handleError('get Customer', new Customer))
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient
      .get<Customer[]>('http://127.0.0.1:3000/customers').pipe(
        tap(data => {
          console.log('fetched customers');
        }),
        catchError(this.handleError('get Customer', []))
      );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    console.log(customer);


    return this.httpClient
      .post<Customer>('http://127.0.0.1:3000/customers', customer, {}).pipe(
        tap(_ => console.log('added customer')),
        catchError(this.handleError('add Customer', new Customer()))
      );
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    console.log(customer);
    const updatedCust = {id, ...customer};

    return this.httpClient
      .put<Customer>('http://127.0.0.1:3000/customers/' +id, updatedCust).pipe(
        tap(_ => console.log('Updated customer')),
        catchError(this.handleError('Update Customer', new Customer()))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
