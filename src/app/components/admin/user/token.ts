import { ActivatedRoute } from '@angular/router';
import { FnService } from './../../../services/fn.service';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    templateUrl: './token.html'
})
export class TokenComponent implements OnInit {
    _dataSet = []
    _loading = true
    _total = 1
    _current = 1
    isVisible = false
    validateForm: FormGroup
    uid: string
    constructor(
        private user: UserService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private fn: FnService,
        private acRoute: ActivatedRoute
    ) {}
    private _refreshList() {
        this.acRoute.paramMap.map((params) => {
            return params.get('id')
        }).subscribe((uid) => {
            this.uid = uid
            this.user.getTokens(uid).subscribe((data: any) => {
                this._loading = false
                this._dataSet = data.data
                this._total = data.total
            })
        })
    }
    ngOnInit() {
        this._refreshList()
    }
    del(data) {
        this.user.delToken(data._id).subscribe(() => {
            this._message.success('删除成功！')
            this._refreshList()
        })
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
