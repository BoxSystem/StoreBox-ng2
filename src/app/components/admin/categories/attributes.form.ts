import { CategoryService } from './../../../services/category.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NzInputDirectiveComponent } from 'ng-zorro-antd';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

class Attrs {
    _id: string = ''
    key: string = ''
    value: string = ''
}


@Component({
    selector: 'category-attrs-form',
    templateUrl: './attributes.form.html'
})
export class CategoryAttrsFormComponent implements OnInit {
    _listLink = '/admin/categories'
    item = new Attrs()
    old = new Attrs()
    category = {
        _id: '',
        attributes: []
    }
    validateForm: FormGroup
    @Output() onAddFinished = new EventEmitter<boolean>()
    constructor(
        private api: CategoryService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.acRoute.paramMap.map((params) => {
            return { cid: params.get('id'), aid: params.get('aid') }
        }).subscribe((params) => {
            this.api.get(params.cid).subscribe((data:any) => {
                this.category = data
                let attrs = this.category.attributes
                for (const key in attrs) {
                    let element = attrs[key];
                    if (element._id === params.aid) {
                        this.item = element
                        this.old = element
                    }
                }
            })
        })
        this.validateForm = this.fb.group({
            key: [this.item.key, [Validators.required]],
            value: [this.item.value, [Validators.required]],
        })
    }
    submit() {
        let subs;
        let body = Object.assign({}, this.item)
        delete body._id
        if (this.item._id) {
            subs = this.api.saveAttrs(
                this.category._id, this.item._id, body
            )
        } else {
            subs = this.api.addAttrs(this.category._id, body)
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 })
            if (this.item._id) {
                this.router.navigate([
                    this._listLink, this.category._id
                ])
            } else {
                this.onAddFinished.emit(true)
            }
        })
    }
    cancel() {
        this.onAddFinished.emit(false)
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
