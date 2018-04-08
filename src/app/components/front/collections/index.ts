import { FrontCollectionService } from './../../../services/front/collection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';
// #TODO 接口返回500无法验证页面
@Component({
    templateUrl: './index.html'
})
export class FrontCollectionComponent implements OnInit {
    _dataSet = [];
    _loading = true;
    _total = 1;
    _current = 1;
    _pageSize = 10;
    cname: string;
    constructor(
        private router: Router,
        private apiCollections: FrontCollectionService,
        private file: FileService,
        private acRoute: ActivatedRoute
    ) {}
    refreshList() {
        this.apiCollections.getList(this.cname, {
            perNum: this._pageSize,
            page: this._current
        }).subscribe((data: any) => {
            this._loading = false;
            this._dataSet = data.data;
            this._total = data.total;
        });
    }
    ngOnInit() {
        this.acRoute.paramMap.map((params) => {
            return params.get('name');
        }).subscribe((name) => {
            this.cname = name;
            this.refreshList();
        });
    }
    downloadFile(data) {
        const url = this.file.downloadUrl(data.category, data._id);
        window.open(url);
    }
}
