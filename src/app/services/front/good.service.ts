import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../api.service';

@Injectable()
export class FrontGoodService extends ApiService {
    apiUrl = '/goods';
    getList(
        params?: { perNum?: number, page?: number, tags?: string[]}
    ) {
        const url = this.apiUrl;
        params = this.parsePageParams(params);
        const options = {
            params: params
        };
        return this.httpGet(url, options);
    }
}
