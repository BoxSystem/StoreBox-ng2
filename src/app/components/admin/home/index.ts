import { SamBreadcrumbService } from './../../../services/breadcrumb.service';
import {
    SamSpinService
} from './../../spinner/service';
import {
    Router,
    NavigationStart,
    NavigationEnd,
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
    breadcrumbItems: any;
    constructor(
        private fn: FnService,
        private auth: AuthService,
        private router: Router,
        public spin: SamSpinService,
        public breadcrumb: SamBreadcrumbService
    ) {
        this.userData = this.fn.getUserSess();
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.spin.start();
            }
            if (event instanceof NavigationEnd) {
                this.breadcrumbItems = this.breadcrumb.getBreadcrumbs();
            }
        });
    }
    logout() {
        this.auth.logout().subscribe(() => {
            this.fn.clearUserSess();
            this.router.navigate(['admin/auth']);
        });
    }
}
