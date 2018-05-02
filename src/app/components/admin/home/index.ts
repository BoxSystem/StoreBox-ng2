import {
    SamSpinService
} from './../../spinner/service';
import {
    Router,
    NavigationStart
} from '@angular/router';
import {
    AuthService
} from './../../../services/auth.service';
import {
    FnService
} from './../../../services/fn.service';
import {
    Component
} from '@angular/core';

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
        private router: Router,
        public spin: SamSpinService
    ) {
        this.userData = this.fn.getUserSess();
        router.events
            .filter(event => event instanceof NavigationStart).subscribe(event => {
                this.spin.start();
            });
    }
    logout() {
        this.auth.logout().subscribe(() => {
            this.fn.clearUserSess();
            this.router.navigate(['admin/auth']);
        });
    }
}
