import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import {BankAccount} from "../model/BankAccount.model";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
      return this.http.get<Array<Customer>>("http://localhost:8085/customers");
    }
  public searchCustomers(keyword : string):Observable<Array<Customer>>{
        return this.http.get<Array<Customer>>("http://localhost:8085/customers/search?keyword="+keyword);
      }
  public saveCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>("http://localhost:8085/customers",customer);
    }
  public deleteCustomer(id: number){
      return this.http.delete("http://localhost:8085/customers/"+id);
    }

  public getAccounts(id: number) :Observable<BankAccount[]>{
    return this.http.get<BankAccount[]>("http://localhost:8085/customers/"+id+"/accounts");
  }
}
