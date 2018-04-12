import { TagService } from './../../../services/tag.service';
import { CategoryService } from './../../../services/category.service';
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
    selector: 'app-tags-form',
    templateUrl: './form.html'
})
export class TagFormComponent implements OnInit {
    Item = {
        _id: '',
        name: '',
        tags: [],
        hidden: true
    };
    selectedLinkId: string;
    oldName: string;
    oldValue: string;
    categories: {
        name: string
    };
    tags: any;
    tagsPage = 1;
    tagsTotalPage = 1;
    selectLoading = false;
    validateForm: FormGroup;
    @Output() onAddSaved = new EventEmitter<boolean>();
    constructor(
        private api: TagService,
        private catApi: CategoryService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.api.cloud().subscribe((data: any) => {
            this.tags = data.data;
        });
        this.catApi.get().subscribe((data: any) => {
            this.categories = data.data;
        });
        this.acRoute.paramMap.map((params) => {
            return params.get('id');
        }).subscribe((id) => {
            if (!id) { return; }
            this.api.get(id).subscribe((element: any) => {
                this.Item = element;
            });
        });
        this.validateForm = this.fb.group({
            name: [this.Item.name, [Validators.required]],
            tags: [this.Item.tags, [Validators.required]],
            hidden: [this.Item.hidden, []],
        });
    }
    submit() {
        let subs;
        const _id = this.Item._id;
        delete this.Item._id;
        if (_id) {
            const body = Object.assign({}, this.Item);
            subs = this.api.save(_id, body);
        } else {
            subs = this.api.add(this.Item);
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 });
            if (_id) {
                this.router.navigate(['admin/tags']);
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
