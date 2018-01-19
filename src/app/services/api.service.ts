import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class ApiService {
    protected apiUrl = '/api/v1';  // URL to web api
    defaultOpts = { responseType: 'json' }
    constructor(private http: Http, private _notification: NzNotificationService, private router: Router) { }
    handleErr(err: any) {
        let errMsg = err.status ? `${err.status} - ${err.statusText}` : err.message ? err.message : 'Server error';
        let title = err.status > 200 ? '服务端响应' : '错误'
        this._notification.create('error', title, errMsg, { nzDuration: 8000 })
        return Observable.throw(new Error(errMsg));
    }
    private setOpts(options?) {
        return options ? Object.assign(this.defaultOpts, options) : this.defaultOpts
    }
    protected httpGet(url, options?) {
        options = this.setOpts(options)
        return this.http.get(url, options)
            .map((data: any) => {
                return data;
            })
            .catch((err: any) => this.handleErr(err))
        }
        protected httpPost(url, body, options?) {
            options = this.setOpts(options)
            return this.http.post(url, body, options)
            .map((data: any) => {
                return data;
            })
            .catch((err: any) => this.handleErr(err))
    }
}
