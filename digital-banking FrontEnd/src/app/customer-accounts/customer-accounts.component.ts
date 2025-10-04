import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {BankAccount} from "../model/BankAccount.model";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: number;
  currentAccounts: BankAccount[]=[];
  savingAccounts: BankAccount[]=[];
  accounts! : Observable<Array<Customer>>;
   constructor(private route : ActivatedRoute, private router :Router,
               private customerService:CustomerService,public authService:AuthService,
               private accountService:AccountsService) {
    }

  ngOnInit(): void {
      this.customerId =Number(this.route.snapshot.paramMap.get('id'));
      if (this.customerId){
        this.loadCustomerAccounts();
      }
    }

  private loadCustomerAccounts(): void {
    this.customerService.getAccounts(this.customerId!).subscribe({
      next: (data) => {
        console.log('Comptes bancaires chargés:', data);
        this.currentAccounts = data.filter(account => account.type === 'CurrentAccount');
        this.savingAccounts = data.filter(account => account.type === 'SavingAccount');
      },
      error: (err) => {
        console.error('Erreur lors du chargement des comptes :', err);
      }
    });
  }

  getOperations(account: BankAccount) {
    this.router.navigateByUrl("/admin/operations/"+account.id);
  }

  handledeletAccount(account: BankAccount) {
    let conf =confirm("Are You Sure? ");
    if(!conf)return;
    this.accountService.deleteAccount(account.id)
     .subscribe({
      next:() => {
        this.loadCustomerAccounts();
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
