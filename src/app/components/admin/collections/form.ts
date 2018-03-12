import { GoodService } from './../../../services/good.service';
import { CollectionService } from './../../../services/collection.service';
import { Component } from '@angular/core';
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
    selector: 'collection-form',
    templateUrl: './form.html'
})
export class CollectionFormComponent implements OnInit {
    cItem: any = {
        name: '',
        goods: [],
    }
    cItemKeys: any
    selectedLinkId: string
    oldName: string
    oldValue: string
    goods: {
        name: string
    }
    validateForm: FormGroup
    @Output() onAddSaved = new EventEmitter<boolean>()
    constructor(
        private api: CollectionService,
        private goodApi: GoodService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.goodApi.get().subscribe((data:any) => {
            this.goods = data.data
        })
        this.acRoute.paramMap.map((params) => {
            return params.get('id')
        }).subscribe((id) => {
            if (!id) { return; }
            this.api.get(id).subscribe((data:any) => {
                this.cItem = data
                try {
                    let goods = []
                    for (const key in this.cItem.goods) {
                        goods.push(this.cItem.goods[key]._id)
                    }
                    this.cItem.goods = goods
                } catch (error) {
                    console.error('文件夹没有文件数据', error)
                }
                this.oldName = data.name
                this.oldValue = data.value
            })
        })
        this.validateForm = this.fb.group({
            name: [this.cItem.name, [Validators.required]],
            goods: [this.cItem.goods, [Validators.required]],
        })
        console.log(Object.keys(this.cItem));
    }
    submit() {
        let subs;
        if (this.cItem._id) {
            let body = Object.assign({}, this.cItem)
            if (this.oldName === body.name) {
                delete body.name
            }
            if (this.oldValue === body.value) {
                delete body.value
            }
            subs = this.api.save(this.cItem._id, body)
        } else {
            subs = this.api.add(this.cItem)
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 })
            if (this.cItem._id) {
                this.router.navigate(['admin/collections'])
            } else {
                this.onAddSaved.emit(true)
                this.validateForm.reset()
            }
        })
    }
    cancel() {
        this.onAddSaved.emit(false)
    }
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
}
