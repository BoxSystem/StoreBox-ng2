import { CategoryService } from './../../../services/category.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class CategoryComponent implements OnInit {
    _routerLink = '/admin/categories';
    _formRouterLink = `${this._routerLink}/form`;
    _dataSet = [];
    _loading = true;
    _total = 1;
    _current = 1;
    _pageSize = 15;
    isVisible = false;
    activeUser: any;
    showAddForm: boolean;
    constructor(private api: CategoryService, private fb: FormBuilder, private _message: NzMessageService) {}
    _refreshList() {
        this.api.get(null, {
            perNum: this._pageSize,
            page: this._current
        }).subscribe((data: any) => {
            this._loading = false;
            this._dataSet = data.data;
            this._total = data.total;
        });
    }
    ngOnInit() {
        this.showAddForm = false;
        this._refreshList();
    }
    addEvent(status: boolean) {
        this.showAddForm = false;
        if (status) {
            this._refreshList();
        }
    }
    del(data) {
        this.api.del(data._id).subscribe(() => {
            this._message.success('删除成功！');
            this._refreshList();
        });
    }
}
