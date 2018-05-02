import { SamSpinService } from './../../spinner/service';
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
    };
    cItemKeys: any;
    oldName: string;
    selectedGoods: any;
    goods: any;
    selectLoading = false;
    goodsPage = 1;
    goodsTotalPage = 1;
    validateForm: FormGroup;
    @Output() onAddSaved = new EventEmitter<boolean>();
    getGoodsOpt(page) {
        return this.goodApi.get(null, {
            perNum: 10, page: page
        });
    }
    constructor(
        private api: CollectionService,
        private goodApi: GoodService,
        private fb: FormBuilder,
        private _message: NzMessageService,
        private acRoute: ActivatedRoute,
        private router: Router,
        public spin: SamSpinService
    ) {}
    ngOnInit() {
        this.getGoodsOpt(this.goodsPage).subscribe((data: any) => {
            this.goodsTotalPage = data.totalPages;
            this.goods = data.data;
        });
        this.acRoute.paramMap.map((params) => {
            return params.get('id');
        }).subscribe((id) => {
            if (!id) { this.spin.stop(); return; }
            this.api.get(id).subscribe((data: any) => {
                this.spin.stop();
                this.cItem = data;
                this.selectedGoods = this.cItem.goods.data
                const goods = [];
                try {
                    for (const key of Object.keys(this.cItem.goods.data)) {
                        const element = this.cItem.goods.data[key];
                        goods.push(element._id);
                    }
                } catch (error) {
                    console.error('文件夹没有文件数据', error);
                }
                this.cItem.goods = goods;
                this.oldName = data.name;
            });
        });
        this.validateForm = this.fb.group({
            name: [this.cItem.name, [Validators.required]],
            goods: [this.cItem.goods, [Validators.required]],
        });
    }
    submit() {
        let subs;
        if (this.cItem._id) {
            const body = Object.assign({}, this.cItem);
            if (this.oldName === body.name) {
                delete body.name;
            }
            subs = this.api.save(this.cItem._id, body);
        } else {
            subs = this.api.add(this.cItem);
        }
        subs.subscribe((data: any) => {
            this._message.success('执行成功', { nzDuration: 3000 });
            if (this.cItem._id) {
                this.router.navigate(['admin/collections']);
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
    scrollToBottom() {
        if (!this.selectLoading) {
            this.selectLoading = true;
            if (this.goodsPage < this.goodsTotalPage) {
                this.goodsPage += 1;
            } else {
                this.selectLoading = false;
                return;
            }
            this.getGoodsOpt(this.goodsPage)
                .subscribe((data: any) => {
                    this.selectLoading = false;
                    for (const key of Object.keys(data.data)) {
                        this.goods.push(data.data[key]);
                    }
                });
        }
    }
}
