import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from './api.service';

interface ICategoryId extends String {}
interface IAttributeId extends String {}

@Injectable()
export class CategoryService extends ApiService {
    apiUrl = this.baseApiUrl + '/categories'
    add(body: {
        "name": string,
        "tags": string[],
        "attributes"?: [{
            key: string,
            value: string
        }],
        "pid": string
    }) {
        return this.httpPost(this.apiUrl, body)
    }
    del(id) {
        let url = `${this.apiUrl}/${id}/delete`
        return this.httpGet(url)
    }
    save(id, body: {
        "name": string,
        "tags": string[],
        "pid": string
    }) {
        let url = `${this.apiUrl}/${id}`
        return this.httpPost(url, body)
    }
    addAttrs(id, body: {
        "key": string,
        "value": string
    }) {
        let url = `${this.apiUrl}/${id}/attributes`
        return this.httpPost(url, body)
    }
    delAttrs(id: ICategoryId, aid: IAttributeId) {
        let url = `${this.apiUrl}/${id}/attributes/${aid}/delete`
        return this.httpGet(url)
    }
    saveAttrs(
        id: ICategoryId,
        aid: IAttributeId,
        body: { "value": string }
    ) {
        let url = `${this.apiUrl}/${id}/attributes/${aid}`
        return this.httpPost(url, body)
    }
}
