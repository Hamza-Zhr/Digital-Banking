import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails, accountOperation, AccountOperation} from "../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  public getAccount(accountId : string,page :number,size:number){
    return this.http.get<AccountDetails>("http://localhost:8085/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
    }
  public debit(accountId:string, amount:number, description:string){
    let data={accountId:accountId, amount:amount, description:description}
    return this.http.post("http://localhost:8085/accounts/debit",data);
    }
  public credit(accountId:string,amount:number, description:string){
    let data={accountId:accountId, amount:amount, description:description}
    return this.http.post("http://localhost:8085/accounts/credit",data);
    }
  public transfer(accountSource :string, accountDestination:string, amount:number, description:string){
    let data={accountSource, accountDestination, amount, description}
    return this.http.post("http://localhost:8085/accounts/transfer",data);
    }


  getAccountOperations(accountId: string | null, page: number, size: number):Observable<AccountDetails> {
    return this.http.get<AccountDetails>("http://localhost:8085/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  saveCurrentAccount(balance: number, overDraft: number, customerId: number) {
    let data={balance, overDraft}
    return this.http.post("http://localhost:8085/addCurrentAccount/"+customerId,data);
  }

  saveSavingAccount(balance: number, interestRate: String, customerId: number) {
    let data={balance, interestRate}
    return this.http.post("http://localhost:8085/addSavingAccount/"+customerId,data);
  }

  deleteAccount(id: string) {
    return this.http.delete("http://localhost:8085/deletAccount/"+id);
  }
}
