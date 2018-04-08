import { AuthService } from './../../../services/auth.service';
import { FnService } from './../../../services/fn.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    styleUrls: ['./index.css'],
    selector: 'app-admin-auth',
    templateUrl: './index.html'
})
export class AuthComponent {
    username: string;
    password: string;
    constructor(private router: Router, private Fn: FnService, private authService: AuthService) {
        this.username = 'root';
        this.password = 'admin';
    }
    submitForm() {
        this.authService.login(this.username, this.password)
            .subscribe((data: any) => {
                const now = new Date();
                const expires = now.getTime() + data.expires;
                const loginInfo = data;
                loginInfo.expires = expires;
                this.Fn.setUserSess(loginInfo);
                const redirect = 'admin/home';
                this.router.navigate([redirect]);
            });
    }
}
