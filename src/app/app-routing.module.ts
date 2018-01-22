import { UserComponent } from './components/admin/user/index';
import { DashboardComponent } from './components/admin/dashboard/index';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/admin/home/index';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/admin/auth/index'
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    {
        path: 'admin',
        children: [
            { path: 'auth', component: AuthComponent },
            {
                path: '',
                component: HomeComponent,
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'home', component: DashboardComponent },
                    { path: 'users', component: UserComponent },
                ]
            }
        ]
    },
];

@NgModule({
    declarations: [
        HomeComponent,
        AuthComponent,
        DashboardComponent,
        UserComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }