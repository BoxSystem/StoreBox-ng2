import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    templateUrl: './add.html'
})
export class UserAddComponent implements OnInit {
    username: string
    pwdGroup: {
        old: string,
        new: string,
        confirm: string,
    }
    validateForm: FormGroup
    constructor(private user: UserService, private fb: FormBuilder, private _message: NzMessageService) {
        this._resetPwdGroup()
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            username: [this.username, [Validators.required]],
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
    submit() {
        this.user.add(this.username, this.pwdGroup.new)
            .subscribe((data: any) => {
                this._message.success('添加用户成功', { nzDuration             : 3000 })
                this.validateForm.reset()
            })
    }
    _resetPwdGroup() {
        this.pwdGroup = {
            old: '',
            new: '',
            confirm: ''
        }
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
