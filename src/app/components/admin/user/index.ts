import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class UserComponent implements OnInit {
    _dataSet = []
    _loading = true
    _total = 1
    _current = 1
    isVisible = false
    activeUser: any
    pwdGroup: {
        old: string,
        new: string,
        confirm: string,
    }
    validateForm: FormGroup
    constructor(private user: UserService, private fb: FormBuilder, private _message: NzMessageService) {
        this._resetPwdGroup()
    }
    private _refreshList() {
        this.user.get().subscribe((data: any) => {
            this._loading = false
            this._dataSet = data.data
            this._total = data.total
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
}
