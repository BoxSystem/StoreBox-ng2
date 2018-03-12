import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    templateUrl: './form.html'
})
export class UserFormComponent implements OnInit {
    Item:any = {
        nickname: ''
    }
    oldNickName: string
    validateForm: FormGroup
    constructor(
        private api: UserService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.acRoute.paramMap.map((params) => {
            return params.get('id')
        }).subscribe((id) => {
            if (!id) { return; }
            this.api.get(id).subscribe((element: any) => {
                this.Item = element
                this.oldNickName = element.name
            })
        })
        this.validateForm = this.fb.group({
            nickname: [this.Item.nickname, [Validators.required]],
        })
    }
    submit() {
        let subs;
        if (this.Item._id) {
            let body = Object.assign({}, this.Item)
            if (this.oldNickName === body.nickname) {
                delete body.nickname
            }
            subs = this.api.save(this.Item._id, body)
        } else {
            return;
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 })
            if (this.Item._id) {
                this.router.navigate(['admin/users'])
            }
        })
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
