import { TagFormComponent } from './components/admin/tags/form';
import { TagComponent } from './components/admin/tags/index';
import { FrontGoodsComponent } from './components/front/goods/index';
import { SamPasswordEyeComponent } from './components/password-eye/index';
import { FrontCollectionService } from './services/front/collection.service';
import { FrontCollectionComponent } from './components/front/collections/index';
import { FrontGoodService } from './services/front/good.service';
import { FrontHomeComponent } from './components/front/home/index';
import { UserFormComponent } from './components/admin/user/form';
import { CollectionFormComponent } from './components/admin/collections/form';
import { CollectionComponent } from './components/admin/collections/index';
import { CollectionService } from './services/collection.service';
import { TokenComponent } from './components/admin/user/token';
import { FileService } from './services/file.service';
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

import { AuthComponent } from './components/admin/auth/index';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { RegexpService } from './services/regexp.service';
import { GoodService } from './services/good.service';
import { TagService } from './services/tag.service';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: FrontHomeComponent,
                children: [
                    { path: '', component: FrontGoodsComponent },
                    { path: 'c/:name', component: FrontCollectionComponent },
                ]
            },
        ]
    },
    {
        path: 'admin',
        children: [
            { path: 'auth', component: AuthComponent },
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'home', component: DashboardComponent },
                    { path: 'users', children: [
                        { path: '', component: UserComponent },
                        { path: ':id/tokens', component: TokenComponent },
                        { path: 'form/:id', component: UserFormComponent },
                    ]},
                    { path: 'regexps', children: [
                        { path: '', component: RegexpComponent },
                        { path: 'form/:id', component: RegexpFormComponent },
                        { path: 'form', component: RegexpFormComponent },
                    ]},
                    { path: 'tags', children: [
                        { path: '', component: TagComponent },
                        { path: 'form/:id', component: TagFormComponent },
                        { path: 'form', component: TagFormComponent },
                    ]},
                    { path: 'categories', children: [
                        { path: '', component: CategoryComponent },
                        { path: 'form/:id', component: CategoryFormComponent },
                        { path: 'form', component: CategoryFormComponent },
                        {
                            path: ':id', children: [
                                { path: '', component: CategoryAttrsComponent },
                                { path: 'attributes/:aid', component: CategoryAttrsFormComponent },
                                { path: 'attributes', component: CategoryAttrsFormComponent }
                            ]
                        },
                    ]},
                    { path: 'goods', children: [
                        { path: '', component: GoodComponent },
                        {
                            path: ':id', children: [
                                { path: '', component: GoodAttrsComponent },
                                { path: 'attributes/:aid', component: GoodAttrsFormComponent },
                                { path: 'attributes', component: GoodAttrsFormComponent }
                            ]
                        },
                    ]},
                    { path: 'collections', children: [
                        { path: '', component: CollectionComponent },
                        {
                            path: 'form/:id',
                            component: CollectionFormComponent
                        },
                        {
                            path: 'form',
                            component: CollectionFormComponent
                        },
                    ]},
                ]
            }
        ]
    },
];

@NgModule({
    declarations: [
        TagComponent,
        TagFormComponent,
        FrontHomeComponent,
        FrontGoodsComponent,
        FrontCollectionComponent,
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
        TokenComponent,
        CollectionComponent,
        CollectionFormComponent,
        UserFormComponent,
        SamPasswordEyeComponent,
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
        FileService,
        CollectionService,
        TagService,
        FrontGoodService,
        FrontCollectionService,
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
