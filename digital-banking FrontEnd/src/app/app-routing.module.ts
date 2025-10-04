import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {OperationsComponent} from "./operations/operations.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Routes = [
  { path:"login",component:LoginComponent},
  { path:"sign-up",component:SignUpComponent},
  { path:"",redirectTo:"/login",pathMatch:"full"},
  { path:"admin",component:AdminTemplateComponent, canActivate:[AuthenticationGuard],
   children:[
      { path:"customers",component:CustomersComponent},
      { path:"accounts",component:AccountsComponent},
      { path :"new-customer", component : NewCustomerComponent ,canActivate:[AuthorizationGuard],data :{role:"ADMIN"}},
      { path :"customer-accounts/:id", component : CustomerAccountsComponent },
      { path :"not-authorised", component : NotAuthorizedComponent},
      { path:"operations/:id", component : OperationsComponent},
      { path:"new-account/:id", component : NewAccountComponent}
    ]},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
