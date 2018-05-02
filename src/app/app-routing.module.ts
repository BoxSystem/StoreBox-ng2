import {
    SamSpinComponent
} from './components/spinner/index';
import {
    TagFormComponent
} from './components/admin/tags/form';
import {
    TagComponent
} from './components/admin/tags/index';
import {
    FrontGoodsComponent
} from './components/front/goods/index';
import {
    SamPasswordEyeComponent
} from './components/password-eye/index';
import {
    FrontCollectionService
} from './services/front/collection.service';
import {
    FrontCollectionComponent
} from './components/front/collections/index';
import {
    FrontGoodService
} from './services/front/good.service';
import {
    FrontHomeComponent
} from './components/front/home/index';
import {
    UserFormComponent
} from './components/admin/user/form';
import {
    CollectionFormComponent
} from './components/admin/collections/form';
import {
    CollectionComponent
} from './components/admin/collections/index';
import {
    CollectionService
} from './services/collection.service';
import {
    TokenComponent
} from './components/admin/user/token';
import {
    FileService
} from './services/file.service';
import {
    GoodAttrsFormComponent
} from './components/admin/goods/attributes.form';
import {
    GoodAttrsComponent
} from './components/admin/goods/attributes';
import {
    GoodComponent
} from './components/admin/goods/index';
import {
    CategoryAttrsFormComponent
} from './components/admin/categories/attributes.form';
import {
    CategoryAttrsComponent
} from './components/admin/categories/attributes';
import {
    CategoryComponent
} from './components/admin/categories/index';
import {
    CategoryFormComponent
} from './components/admin/categories/form';
import {
    CategoryService
} from './services/category.service';
import {
    RegexpFormComponent
} from './components/admin/regexps/form';
import {
    RegexpComponent
} from './components/admin/regexps/index';
import {
    UserAddComponent
} from './components/admin/user/add';
import {
    UserComponent
} from './components/admin/user/index';
import {
    DashboardComponent
} from './components/admin/dashboard/index';
import {
    AuthGuard
} from './services/auth-guard.service';
import {
    HomeComponent
} from './components/admin/home/index';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    CommonModule
} from '@angular/common';
import {
    NgZorroAntdModule
} from 'ng-zorro-antd';
import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

import {
    AuthComponent
} from './components/admin/auth/index';
import {
    UserService
} from './services/user.service';
import {
    AuthService
} from './services/auth.service';
import {
    RegexpService
} from './services/regexp.service';
import {
    GoodService
} from './services/good.service';
import {
    TagService
} from './services/tag.service';
import {
    SamSpinService
} from './components/spinner/service';
import {
    SamBreadcrumbService
} from './services/breadcrumb.service';

const routes: Routes = [{
        path: '',
        children: [{
            path: '',
            component: FrontHomeComponent,
            children: [{
                    path: '',
                    component: FrontGoodsComponent
                },
                {
                    path: 'c/:name',
                    component: FrontCollectionComponent
                },
            ]
        }, ]
    },
    {
        path: 'admin',
        children: [{
                path: 'auth',
                component: AuthComponent
            },
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                children: [{
                        path: 'home',
                        component: DashboardComponent
                    },
                    {
                        path: 'users',
                        data: {
                            breadcrumb: '用户管理'
                        },
                        children: [{
                                path: '',
                                component: UserComponent,
                                data: {
                                    breadcrumb: '列表'
                                }
                            },
                            {
                                path: ':id/tokens',
                                component: TokenComponent,
                                data: {
                                    breadcrumb: 'Token列表'
                                }
                            },
                            {
                                path: 'form/:id',
                                component: UserFormComponent,
                                data: {
                                    breadcrumb: '修改'
                                }
                            },
                        ]
                    },
                    {
                        path: 'regexps',
                        data: {
                            breadcrumb: '正则管理'
                        },
                        children: [{
                                path: '',
                                component: RegexpComponent,
                                data: {
                                    breadcrumb: '列表'
                                }
                            },
                            {
                                path: 'form/:id',
                                component: RegexpFormComponent,
                                data: {
                                    breadcrumb: '修改'
                                }
                            },
                            {
                                path: 'form',
                                component: RegexpFormComponent
                            },
                        ]
                    },
                    {
                        path: 'tags',
                        data: {
                            breadcrumb: '标签组管理'
                        },
                        children: [{
                                path: '',
                                component: TagComponent,
                                data: {
                                    breadcrumb: '列表'
                                }
                            },
                            {
                                path: 'form/:id',
                                component: TagFormComponent,
                                data: {
                                    breadcrumb: '修改'
                                }
                            },
                            {
                                path: 'form',
                                component: TagFormComponent
                            },
                        ]
                    },
                    {
                        path: 'categories',
                        data: {
                            breadcrumb: '分类管理'
                        },
                        children: [{
                                path: '',
                                component: CategoryComponent,
                                data: {
                                    breadcrumb: '列表'
                                }
                            },
                            {
                                path: 'form/:id',
                                component: CategoryFormComponent,
                                data: {
                                    breadcrumb: '修改'
                                }
                            },
                            {
                                path: 'form',
                                component: CategoryFormComponent
                            },
                            {
                                path: ':id',
                                data: {
                                    breadcrumb: '属性管理'
                                },
                                children: [{
                                        path: '',
                                        component: CategoryAttrsComponent,
                                        data: {
                                            breadcrumb: '列表'
                                        }
                                    },
                                    {
                                        path: 'attributes/:aid',
                                        component: CategoryAttrsFormComponent,
                                        data: {
                                            breadcrumb: '修改'
                                        }
                                    },
                                    {
                                        path: 'attributes',
                                        component: CategoryAttrsFormComponent
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        path: 'goods',
                        data: {
                            breadcrumb: '文件管理'
                        },
                        children: [{
                                path: '',
                                component: GoodComponent,
                                data: {
                                    breadcrumb: '列表'
                                }
                            },
                            {
                                path: ':id',
                                data: {
                                    breadcrumb: '属性管理'
                                },
                                children: [{
                                        path: '',
                                        component: GoodAttrsComponent,
                                        data: {
                                            breadcrumb: '列表'
                                        }
                                    },
                                    {
                                        path: 'attributes/:aid',
                                        component: GoodAttrsFormComponent,
                                        data: {
                                            breadcrumb: '修改'
                                        },
                                    },
                                    {
                                        path: 'attributes',
                                        component: GoodAttrsFormComponent
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        path: 'collections',
                        data: {
                            breadcrumb: '文件夹管理'
                        },
                        children: [{
                                path: '',
                                component: CollectionComponent,
                                data: {
                                    breadcrumb: '列表'
                                }
                            },
                            {
                                path: 'form/:id',
                                component: CollectionFormComponent,
                                data: {
                                    breadcrumb: '修改'
                                }
                            },
                            {
                                path: 'form',
                                component: CollectionFormComponent
                            },
                        ]
                    },
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
        SamSpinComponent,
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
        SamSpinService,
        SamBreadcrumbService,
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {}
