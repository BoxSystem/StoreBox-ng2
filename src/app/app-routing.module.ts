import { GoodAttrsFormComponent } from './components/admin/goods/attributes.form';
import { GoodAttrsComponent } from './components/admin/goods/attributes';
import { GoodComponent } from './components/admin/goods/index';
import { CategoryAttrsFormComponent } from './components/admin/categories/attributes.form';
import { CategoryAttrsComponent } from './components/admin/categories/attributes';
import { CategoryComponent } from './components/admin/categories/index';
import { CategoryFormComponent } from './components/admin/categories/form';
import { CategoryService } from './services/category.service';
import { RegexpFormComponent } from './components/admin/regexps/form';
import { RegexpComponent } from './components/admin/regexps/index';
import { UserAddComponent } from './components/admin/user/add';
import { UserComponent } from './components/admin/user/index';
import { DashboardComponent } from './components/admin/dashboard/index';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/admin/home/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/admin/auth/index'
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { RegexpService } from './services/regexp.service';
import { GoodService } from './services/good.service';

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
                    { path: 'users', children: [
                        { path:"", component: UserComponent },
                        { path:"add", component: UserAddComponent },
                    ]},
                    { path: 'regexps', children: [
                        { path:"", component: RegexpComponent },
                        { path:"form/:id", component: RegexpFormComponent },
                        { path:"form", component: RegexpFormComponent },
                    ]},
                    { path: 'categories', children: [
                        { path:"", component: CategoryComponent },
                        { path:"form/:id", component: CategoryFormComponent },
                        { path: "form", component: CategoryFormComponent },
                        {
                            path: ":id", children: [
                                { path: "", component: CategoryAttrsComponent },
                                { path: "attributes/:aid", component: CategoryAttrsFormComponent },
                                { path: "attributes", component: CategoryAttrsFormComponent }
                            ]
                        },
                    ]},
                    { path: 'goods', children: [
                        { path:"", component: GoodComponent },
                        {
                            path: ":id", children: [
                                { path: "", component: GoodAttrsComponent },
                                { path: "attributes/:aid", component: GoodAttrsFormComponent },
                                { path: "attributes", component: GoodAttrsFormComponent }
                            ]
                        },
                    ]},
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
        UserAddComponent,
        RegexpComponent,
        RegexpFormComponent,
        CategoryComponent,
        CategoryFormComponent,
        CategoryAttrsComponent,
        CategoryAttrsFormComponent,
        GoodComponent,
        GoodAttrsComponent,
        GoodAttrsFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
        RegexpService,
        CategoryService,
        GoodService,
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
