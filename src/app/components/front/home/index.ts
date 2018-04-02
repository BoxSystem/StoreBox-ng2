import { FrontGoodService } from './../../../services/front/good.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';

@Component({
    templateUrl: './index.html'
})
export class FrontHomeComponent implements OnInit {
    _dataSet = [];
    _loading = true;
    _total = 1;
    _current = 1;
    _pageSize = 10;
    constructor(
        private router: Router,
        private apiGood: FrontGoodService,
        private file: FileService
    ) {}
    refreshList() {
        this.apiGood.getList({
            perNum: this._pageSize,
            page: this._current
        }).subscribe((data: any) => {
            this._loading = false;
            this._dataSet = data.data;
            this._total = data.total;
        });
    }
    ngOnInit() {
        this.refreshList();
    }
    downloadFile(data) {
        const url = this.file.downloadUrl(data.category, data._id);
        window.open(url);
    }
}
