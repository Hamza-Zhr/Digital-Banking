import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountsService} from "../services/accounts.service";
import {AccountDetails, accountOperation, AccountOperation} from "../model/account.model";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent implements OnInit{
  public accountId! : string | null  ;
  currentPage : number =0;
  pageSize : number =5;
  public accountOperations!: AccountDetails;
  public operationFromGroup! :FormGroup;
  constructor(private route:ActivatedRoute,private accountService:AccountsService,
             public authService:AuthService, private fb:FormBuilder) {
  }

  ngOnInit() {
    this.accountId=this.route.snapshot.paramMap.get('id');
    console.log(this.accountId);
    if (this.accountId){
        this.handleOperationAccounts(this.accountId,this.currentPage,this.pageSize);
    }
    this.operationFromGroup=this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })
  }

  private handleOperationAccounts(accountId: string |null, currentPage: number, pageSize: number) {
    this.accountService.getAccountOperations(accountId,currentPage,pageSize)
      .subscribe({
        next:data=>{
          console.log(data);
          this.accountOperations=data;
        },
        error:err => {
          console.log(err);
        }
      });
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleOperationAccounts(this.accountId,this.currentPage,this.pageSize)
  }

  handleAccountOperation() {
    let operationType:string=this.operationFromGroup.value.operationType;
    let amount :number =this.operationFromGroup.value.amount;
    let description :string =this.operationFromGroup.value.description;
    let accountDestination :string =this.operationFromGroup.value.accountDestination;

    if(operationType=="DEBIT"){
      this.accountService.debit(<string>this.accountId,amount,description).subscribe({
        next : (data)=>{
          alert("Success Debit");
          this.operationFromGroup.reset();
          this.handleOperationAccounts(this.accountId,this.currentPage,this.pageSize);
        },
        error :(err)=>{
          console.log(err);
        }
      });
    }else if(operationType="CREDIT"){
      this.accountService.credit(<string>this.accountId,amount,description).subscribe({
        next : (data)=>{
          alert("Success Credit");
          this.operationFromGroup.reset();
          this.handleOperationAccounts(this.accountId,this.currentPage,this.pageSize);
        },
        error :(err)=>{
          console.log(err);
        }
      });
    }else if(operationType="TRANSFER"){
      this.accountService.transfer(<string>this.accountId,accountDestination,amount,description).subscribe({
        next : (data)=>{
          alert("Success Transfer");
          this.operationFromGroup.reset();
          this.handleOperationAccounts(this.accountId,this.currentPage,this.pageSize);
        },
        error :(err)=>{
          console.log(err);
        }
      });
    }

  }

}
