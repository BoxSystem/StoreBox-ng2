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
export class CategoryService extends ApiService {
    prefixUrl = this.apiUrl + '/categroies'
    get() {
        return this.httpGet(this.prefixUrl)
    }
    add(body: {
        "name": string,
        "tags": string[],
        "attributes"?: [{
            key: string,
            value: string
        }],
        "pid": string
    }) {
        return this.httpPost(this.prefixUrl, body)
    }
    del(id) {
        let url = `${this.prefixUrl}/${id}/delete`
        return this.httpGet(url)
    }
    save(id, body: {
        "name": string,
        "tags": string[],
        "pid": string
    }) {
        let url = `${this.prefixUrl}/${id}`
        return this.httpPost(url, body)
    }
}
