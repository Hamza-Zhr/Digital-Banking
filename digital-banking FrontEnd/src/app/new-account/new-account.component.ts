import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.css'
})
export class NewAccountComponent implements OnInit{

  public customerId!: number;
  public  newAccountFromGroup!:FormGroup;
  constructor(private route:ActivatedRoute,private fb:FormBuilder,private accountService:AccountsService,
              private router:Router) {
  }

  ngOnInit() {
    this.customerId =Number(this.route.snapshot.paramMap.get('id'));

    this.newAccountFromGroup=this.fb.group({
      accountType:this.fb.control("null"),
      balance:this.fb.control(0),
      overDraft:this.fb.control(0),
      interestRate:this.fb.control(0)
    })
  }

  handleNewAccount() {
    let accountType:String=this.newAccountFromGroup.value.accountType;
    let balance:number=this.newAccountFromGroup.value.balance;
    let overDraft: number=this.newAccountFromGroup.value.overDraft;
    let interestRate:String=this.newAccountFromGroup.value.interestRate;
    if (accountType=="CURRENT"){
        this.accountService.saveCurrentAccount(balance,overDraft,this.customerId)
          .subscribe({
            next:data=>{
              alert("Current Account add success");
              this.router.navigateByUrl("/admin/customer-accounts/"+this.customerId);
            },
            error:err => {
              console.log(err);
            }
          });
    }
    else if (accountType=="SAVING"){
        this.accountService.saveSavingAccount(balance,interestRate,this.customerId)
          .subscribe({
            next:data=>{
              alert("Saving Account add success");
              this.router.navigateByUrl("/admin/customer-accounts/"+this.customerId);
            },
            error:err => {
              console.log(err);
            }
          });
    }
  }
}
