import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { FnService } from './../../../services/fn.service';
import { Component } from '@angular/core';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class HomeComponent {
    userData: object;
    isCollapsed = false;
    constructor(
        private fn: FnService,
        private auth: AuthService,
        private router: Router
    ) {
        this.userData = this.fn.getUserSess();
    }
    logout() {
        this.auth.logout().subscribe(() => {
            this.fn.clearUserSess();
            this.router.navigate(['admin/auth']);
        });
    }
}
