import { GoodService } from './../../../services/good.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './attributes.html'
})
export class GoodAttrsComponent implements OnInit {
    _routerLink = '/admin/goods'
    _formRouterLink = ''
    _dataSet = []
    _loading = true
    _total = 1
    _current = 1
    isVisible = false
    good: {
        _id: string
    }
    showAddForm = false
    constructor(private api: GoodService, private fb: FormBuilder, private _message: NzMessageService, private acRoute: ActivatedRoute) {}
    private _refreshList(id) {
        this.api.get(id).subscribe((data: any) => {
            this._loading = false
            this.good = data
            this._dataSet = data.attributes
            this._total = data.attributes.length
        })
    }
    ngOnInit() {
        this.acRoute.paramMap.map((params) => {
            return params.get('id')
        }).subscribe((id) => {
            this._formRouterLink = `${this._routerLink}/${id}/attributes`
            this._refreshList(id)
        })
    }
    addEvent(status: boolean) {
        this.showAddForm = false
        if (status) {
            this._refreshList(this.good._id)
        }
    }
    del(data) {
        this.api.delAttrs(
            this.good._id,
            data._id
        ).subscribe(() => {
            this._message.success('删除成功！')
            this._refreshList(this.good._id)
        })
    }
}
