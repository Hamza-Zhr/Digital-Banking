
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
   customers! : Observable<Array<Customer>>;
   errorMessage!: string;
   searchFormGroup : FormGroup | undefined;

   constructor(private customerService : CustomerService,private fb: FormBuilder,
               public authService:AuthService,private router:Router){ }

   ngOnInit():void{
     this.searchFormGroup=this.fb.group({
       keyword :this.fb.control("")
       });
     this.handleSearchCustomers();

    }
  handleSearchCustomers() {
    if (this.authService.roles.includes('ADMIN')) {
      let kw = this.searchFormGroup?.value.keyword;
      this.customers = this.customerService.searchCustomers(kw).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }
    else {
      this.customers = this.customerService.searchCustomers(this.authService.username).pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
    }
  }
  handleDeleteCustomer(c:Customer){
    let conf =confirm("Are You Sure? ");
    if(!conf)return;
      this.customerService.deleteCustomer(c.id).subscribe({
        next : (resp) => {
          this.customers=this.customers.pipe(
            map((data: any)=>{
              let index=data.indexOf(c);
              data.slice(index,1)
              return data;
              })
            );
          },
        error : err => {
          console.log(err);
         }
       })
    }

  getAccount(c:Customer) {
     this.router.navigateByUrl("/admin/customer-accounts/"+c.id);

  }

  handleAddAccount(c: Customer) {
     this.router.navigateByUrl("/admin/new-account/"+c.id);

  }
}
