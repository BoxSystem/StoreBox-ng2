import { FnService } from './fn.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private Fn: FnService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let userData = this.Fn.getUserSess()
        let now = new Date()
        let failRedirect = ['admin/auth']
        if (!userData || !userData.expires) {
            this.router.navigate(['admin/auth'])
            return false
        }
        if (userData.expires < now.getTime()) {
            this.router.navigate(['admin/auth'])
            return false
        }
        return true
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(route, state)
    }
}
