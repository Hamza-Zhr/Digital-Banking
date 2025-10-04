import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  public newCustomerFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,private customerService:CustomerService,
              private router: Router) {
  }

  ngOnInit() {
    this.newCustomerFormGroup=this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(null,[Validators.required, Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.minLength(4)])
    });
  }

  handleSaveCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer)
      .subscribe({
        next : data=>{
          alert("Customer has been successfully saved!");
          //this.newCustomerFormGroup.reset();
          this.router.navigateByUrl("/login");
        },
        error : err =>{
          console.log(err);
        }
      });
  }
}
