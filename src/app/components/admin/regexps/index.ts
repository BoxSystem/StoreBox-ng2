import { Router } from '@angular/router';
import { RegexpService } from './../../../services/regexp.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { RegexpDoc } from './regexp.doc';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class RegexpComponent implements OnInit {
    _routerLink = '/admin/regexps';
    _formRouterLink = `${this._routerLink}/form`;
    _dataSet = [];
    _loading = true;
    _total = 1;
    _current = 1;
    _pageSize = 10;
    isVisible = false;
    cloneItem = new RegexpDoc();
    showAddForm: boolean;
    constructor(
        private api: RegexpService,
        private fb: FormBuilder,
        private _message: NzMessageService
    ) {}
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
    showFormEvent(status: boolean) {
        this.showAddForm = status;
    }
    clone(data) {
        this.showAddForm = true;
        this.cloneItem = Object.assign({}, data);
        delete this.cloneItem._id;
        try {
            this.cloneItem.link = data.link._id;
        } catch (error) {
            console.log('被复制正则没有关联分类');
        }
    }
    del(data) {
        this.api.del(data._id).subscribe(() => {
            this._message.success('删除成功！');
            this._refreshList();
        });
    }
}
