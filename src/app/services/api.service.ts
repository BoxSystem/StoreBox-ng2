import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NzNotificationService } from 'ng-zorro-antd';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService {
    protected baseApiUrl = '/api/v1';  // base URL to web api
    public apiUrl: string;
    defaultOpts = { responseType: 'json' };
    constructor(private http: Http, private _notification: NzNotificationService, private router: Router) { }
    handleErr(err: any) {
        let errMsg = err.status;
        if (err.error && err.error.error) {
            errMsg += ` - ${err.error.message}`;
        } else {
            errMsg += ` - ${err.statusText}`;
        }
        this._notification.create('error', '错误', errMsg, { nzDuration: 4000 });
        if (err.status === 403) {
            this.router.navigate(['admin/auth']);
        }
        return Observable.throw(errMsg);
    }
    private setOpts(options?) {
        const opts = Object.assign({}, this.defaultOpts, options);
        if (opts.params) {
            opts.params = this.handleUrlParameters(opts.params);
        }
        return opts;
    }
    // 处理http参数
    private handleUrlParameters(params) {
        let httpParams = new HttpParams();
        for (const key of Object.keys(params)) {
            const value = params[key];
            httpParams = httpParams.append(key, value);
        }
        return httpParams;
    }
    protected httpGet(url, options?) {
        options = this.setOpts(options);
        return this.http.get(url, options)
            .catch((err: any) => this.handleErr(err));
    }
    protected httpPost(url, body, options?) {
        options = this.setOpts(options);
        return this.http.post(url, body, options)
            .catch((err: any) => this.handleErr(err));
    }
    // 保证分页参数完整
    parsePageParams(params) {
        const defPage = 1;
        const defPerNum = 25;
        return Object.assign({}, {
            page: defPage,
            perNum: defPerNum
        }, params);
    }
    get(
        id?: string,
        params?: { perNum?: number, page?: number }
    ) {
        const url = id ? `${this.apiUrl}/${id}` : this.apiUrl;
        let options = null;
        if (!id) {
            params = this.parsePageParams(params);
            options = { params: params };
        }
        return this.httpGet(url, options);
    }
}
