import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

interface IGoodId extends String {}
interface IAttributeId extends String {}

@Injectable()
export class GoodService extends ApiService {
    apiUrl = this.baseApiUrl + '/goods'
    addAttrs(id, body: {
        "key": string,
        "value": string
    }) {
        let url = `${this.apiUrl}/${id}/attributes`
        return this.httpPost(url, body)
    }
    delAttrs(id: IGoodId, aid: IAttributeId) {
        let url = `${this.apiUrl}/${id}/attributes/${aid}/delete`
        return this.httpGet(url)
    }
    saveAttrs(
        id: IGoodId,
        aid: IAttributeId,
        body: { "value": string }
    ) {
        let url = `${this.apiUrl}/${id}/attributes/${aid}`
        return this.httpPost(url, body)
    }
    upload(formData) {
        return this.httpPost(this.apiUrl, formData)
    }
}
