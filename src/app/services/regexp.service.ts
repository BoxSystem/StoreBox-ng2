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
    apiUrl = this.baseApiUrl + '/regexps';
    add(body: { name: string, value: string, link: string }) {
        return super.add(body);
    }
    del(id) {
        return super.del(id);
    }
    save(id, body: {name: string, value: string, link: string}) {
        const url = `${this.apiUrl}/${id}`;
        return this.httpPost(url, body);
    }
}
