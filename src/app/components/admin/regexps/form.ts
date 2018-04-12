import { RegexpDoc } from './regexp.doc';
import { CategoryService } from './../../../services/category.service';
import { RegexpService } from './../../../services/regexp.service';
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-regexp-form',
    templateUrl: './form.html'
})
export class RegexpFormComponent implements OnInit {
    @Input()
    regexpItem = new RegexpDoc();
    selectedLinkId: string;
    oldName: string;
    oldValue: string;
    categories: {
        name: string
    };
    validateForm: FormGroup;
    @Output() onAddSaved = new EventEmitter<boolean>();
    constructor(
        private api: RegexpService,
        private catApi: CategoryService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.catApi.get().subscribe((data: any) => {
            this.categories = data.data;
        });
        this.acRoute.paramMap.map((params) => {
            return params.get('id');
        }).subscribe((id) => {
            if (!id) { return; }
            this.api.get(id).subscribe((element: any) => {
                this.regexpItem = element;
                try {
                    this.regexpItem.link = element.link._id;
                } catch (error) {
                    console.log('正则没有关联分类');
                }
                this.oldName = element.name;
                this.oldValue = element.value;
            });
        });
        this.validateForm = this.fb.group({
            name: [this.regexpItem.name, [Validators.required]],
            value: [this.regexpItem.name, [
                Validators.required, this._isRegExp
            ]],
            link: [this.regexpItem.name, []],
        });
    }
    _isRegExp = (control: AbstractControl) => {
        let bool = true;
        if (this.validateForm) {
            try {
                const reg = new RegExp(control.value);
                bool = false;
            } catch (error) {
                bool = true;
            }
        }
        return bool ? { regexp: true } : null;
    }
    submit() {
        let subs;
        const _id = this.regexpItem._id;
        delete this.regexpItem._id;
        if (_id) {
            const body = Object.assign({}, this.regexpItem);
            if (this.oldName === body.name) {
                delete body.name;
        }
            if (this.oldValue === body.value) {
                delete body.value;
            }
            subs = this.api.save(_id, body);
        } else {
            subs = this.api.add(this.regexpItem);
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 });
            if (_id) {
                this.router.navigate(['admin/regexps']);
            } else {
                this.onAddSaved.emit(true);
                this.validateForm.reset();
            }
        });
    }
    cancel() {
        this.onAddSaved.emit(false);
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
