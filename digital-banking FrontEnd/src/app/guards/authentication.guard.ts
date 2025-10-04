
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()


export class AuthenticationGuard implements CanActivate{
  constructor(private authService : AuthService,
              private router : Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated){
      return true;
    }else {
      this.router.navigateByUrl("/login");
      return false
    }
  }
}
