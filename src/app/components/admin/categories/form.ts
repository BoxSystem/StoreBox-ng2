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
import { NzInputComponent, NzInputDirectiveComponent } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewChildren } from '@angular/core';

@Component({
    selector: 'app-category-form',
    templateUrl: './form.html'
})
export class CategoryFormComponent implements OnInit {
    item: any = {
        name: '',
        tags: [],
        pid: ''
    };
    oldName: string;
    oldValue: string;
    validateForm: FormGroup;
    inputVisible = false;
    inputValue = '';
    categories = [];
    selectedPid: string;
    @ViewChildren('tagInput')
    private input: QueryList<NzInputComponent>;
    @Output() onAddSaved = new EventEmitter<boolean>();
    constructor(
        private api: CategoryService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        const self = this;
        this.acRoute.paramMap.map((params) => {
            return params.get('id');
        }).subscribe((id) => {
            this.api.get().map(data => data.data)
                .mergeMap(data => data)
                .filter((item: any) => item._id !== id)
                .subscribe((data: any) => {
                    this.categories.push(data);
                });
            if (!id) { return; }
            this.api.get(id).subscribe((element: any) => {
                Object.assign(this.item, element);
                try {
                    this.item.pid = this.item.pid._id;
                } catch (error) {
                    console.warn('分类pid数据丢失', this.item);
                }
                this.oldName = element.name;
                this.oldValue = element.value;
            });
        });
        this.validateForm = this.fb.group({
            name: [this.item.name, [Validators.required]],
            tag: [null, []],
            pid: [null, []],
        });
    }
    submit() {
        let subs;
        if (this.item._id) {
            const body = Object.assign({}, this.item);
            if (this.oldName === body.name) {
                delete body.name;
            }
            subs = this.api.save(this.item._id, body);
        } else {
            subs = this.api.add(this.item);
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 });
            if (this.item._id) {
                this.router.navigate(['admin/categories']);
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
            const first = this.input.first;
            if (first) {
                first._el.getElementsByTagName('input')[0].focus();
            }
        }, 100);
    }
    handleInputConfirm(): void {
        if (this.inputValue) {
            this.item.tags.push(this.inputValue);
        }
        this.inputValue = '';
        this.inputVisible = false;
    }
}
