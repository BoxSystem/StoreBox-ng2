import { GoodService } from './../../../services/good.service';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { FileService } from '../../../services/file.service';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class GoodComponent implements OnInit {
    _routerLink = '/admin/goods'
    _formRouterLink = `${this._routerLink}/form`
    _dataSet = []
    _loading = true
    _total = 1
    _current = 1
    _pageSize = 10
    isVisible = false
    activeUser: any
    isUploading = false
    @ViewChild('fileInput') fileInput;
    constructor(private api: GoodService, private fb: FormBuilder, private _message: NzMessageService, private file: FileService) {}
    private _refreshList() {
        this.api.get(null, {
            perNum: this._pageSize,
            page: this._current
        }).subscribe((data: any) => {
            this._loading = false
            this._dataSet = data.data
            this._total = data.total
        })
    }
    ngOnInit() {
        this._refreshList()
    }
    downloadFile(data) {
        let url = this.file.downloadUrl(data.category, data._id)
        window.open(url)
    }
    upload() {
        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            const formData = new FormData();
            formData.append("file", fileBrowser.files[0]);
            this.isUploading = true
            this.api.upload(formData)
                .subscribe(() => {
                    this.isUploading = false
                    this._message.success('上传成功')
                    this._refreshList()
                }, () => this.isUploading = false)
        }
    }
}
