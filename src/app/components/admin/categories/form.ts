import { element } from 'protractor';
import { CategoryService } from './../../../services/category.service';
import { Component, QueryList } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { NzInputComponent, NzInputDirectiveComponent } from 'ng-zorro-antd';
import { ViewChildren } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    templateUrl: './form.html'
})
export class CategoryFormComponent implements OnInit {
    item: any = {
        name: '',
        tags: [],
    }
    oldName: string
    oldValue: string
    validateForm: FormGroup
    inputVisible = false
    inputValue = ''
    categories: any
    selectedPid: string
    @ViewChildren('tagInput')
    private input: QueryList<NzInputComponent>
    constructor(
        private api: CategoryService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        let self = this
        this.acRoute.paramMap.map((params) => {
            return params.get('id')
        }).subscribe((id) => {
            this.api.get()
            .map(data => {
                    this.categories = data.data
                    return data.data
                })
                .mergeMap(val => val)
                .filter((item: any) => item._id === id)
                .subscribe((data:any) => {
                    this.item = data
                    this.oldName = this.item.name
                    this.oldValue = this.item.value
                    Observable.of(this.categories)
                        .mergeMap(val => val)
                        .filter((item: any) => {
                            return item._id === this.item.pid
                        })
                        .subscribe(data => {
                            console.log(data)
                            this.selectedPid = data._id
                        })
                })
        })
        this.validateForm = this.fb.group({
            name: [this.item.name, [Validators.required]],
            tag: [null, []],
            pid: [null, []],
        })
    }
    submit() {
        let subs;
        if (this.item._id) {
            let body = Object.assign({}, this.item)
            if (this.oldName === body.name) {
                delete body.name
            }
            subs = this.api.save(this.item._id, body)
        } else {
            subs = this.api.add(this.item)
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 })
            if (this.item._id) {
                this.router.navigate(['admin/categories'])
            } else {
                this.validateForm.reset()
            }
        })
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    handleClose(removedTag: any): void {
        this.item.tags = this.item.tags.filter(tag => tag !== removedTag);
    }

    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }

    showInput(): void {
        this.inputVisible = true;
        setTimeout(() => {
            this.input.first._el.getElementsByTagName('input')[0].focus();
        }, 30);
    }

    handleInputConfirm(): void {
        if (this.inputValue) {
            this.item.tags.push(this.inputValue);
        }
        this.inputValue = '';
        this.inputVisible = false;
    }
}
