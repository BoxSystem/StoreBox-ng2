import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from './api.service';

@Injectable()
export class RegexpService extends ApiService {
    apiUrl = this.baseApiUrl + '/regexps'
    add(body: { name: string, value: string, link: string }) {
        return this.httpPost(this.apiUrl, body)
    }
    del(id) {
        let url = `${this.apiUrl}/${id}/delete`
        return this.httpGet(url)
    }
    save(id, body: {name:string, value:string, link:string}) {
        let url = `${this.apiUrl}/${id}`
        return this.httpPost(url, body)
    }
}
