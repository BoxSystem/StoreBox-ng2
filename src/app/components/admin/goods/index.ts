import { GoodService } from './../../../services/good.service';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { FileService } from '../../../services/file.service';
import { NzUploadComponent } from 'ng-zorro-antd';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class GoodComponent implements OnInit {
    _routerLink = '/admin/goods';
    _formRouterLink = `${this._routerLink}/form`;
    _dataSet = [];
    _loading = true;
    _total = 1;
    _current = 1;
    _pageSize = 10;
    isVisible = false;
    activeUser: any;
    isUploading = false;
    uploadUrl: string;
    @ViewChild('fileInput') fileInput;
    constructor(private api: GoodService, private fb: FormBuilder, private _message: NzMessageService, private file: FileService) {}
    private _refreshList() {
        this.uploadUrl = this.api.apiUrl;
        this.api.get(null, {
            perNum: this._pageSize,
            page: this._current
        }).subscribe((data: any) => {
            this._loading = false;
            this._dataSet = data.data;
            this._total = data.total;
        });
    }
    ngOnInit() {
        this._refreshList();
    }
    downloadFile(data) {
        const url = this.file.downloadUrl(data.category, data._id);
        window.open(url);
    }
    handleChange({ file, fileList }) {
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this._message.success(`${file.name} 上传成功.`);
            this._refreshList();
        } else if (status === 'error') {
            this._message.error(`${file.name} 上传失败.`);
        }
    }
}
