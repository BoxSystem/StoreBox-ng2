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
    activeUser: any
    curUser: any
    pwdGroup: {
        old: string,
        new: string,
        confirm: string,
    }
    validateForm: FormGroup
    hideAddForm: boolean
    constructor(
        private user: UserService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private fn: FnService,
        private acRoute: ActivatedRoute
    ) {
        this.hideAddForm = true
        this.curUser = this.fn.getUserSess()
        this._resetPwdGroup()
    }
    private _refreshList() {
        this.acRoute.paramMap.map((params) => {
            return params.get('id')
        }).subscribe((uid) => {
            this.user.getTokens(uid).subscribe((data: any) => {
                this._loading = false
                this._dataSet = data.data
                this._total = data.total
            })
        })
    }
    ngOnInit() {
        this._refreshList()
        this.validateForm = this.fb.group({
            oldPwd: [this.pwdGroup.old, [Validators.required]],
            newPwd: [this.pwdGroup.new, [Validators.required]],
            confirmPwd: [this.pwdGroup.confirm, [
                Validators.required,
                this._confirmationValidator
            ]]
        })
    }
    private _confirmationValidator = (control: AbstractControl) => {
        let bool: boolean = this.validateForm && control.value !== this.validateForm.controls['newPwd'].value
        return bool ? { confirm: true } : null;
    };
    del(data) {
        this.user.del(data._id).subscribe(() => {
            this._message.success('删除成功！')
            this._refreshList()
        })
    }
    allow(data) {
        this.user.allow(data._id).subscribe(() => data.active = true)
    }
    ban(data) {
        this.user.ban(data._id).subscribe(() => data.active = false)
    }
    _resetPwdGroup() {
        this.pwdGroup = {
            old: '',
            new: '',
            confirm: ''
        }
    }
    showPwdFormModal(data) {
        this._resetPwdGroup()
        this.isVisible = true
        this.activeUser = data
    }
    changePwd() {
        this.user.changePassword(
            this.activeUser._id, this.pwdGroup.old, this.pwdGroup.new
        ).subscribe((data) => {
            console.log(data)
            // this.isVisible = false
        })
    }
    handleCancel = (e) => {
        console.log(e);
        this.isVisible = false;
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    addEvent(status: boolean) {
        this.hideAddForm = true
        if (status) {
            this._refreshList()
        }
    }
}