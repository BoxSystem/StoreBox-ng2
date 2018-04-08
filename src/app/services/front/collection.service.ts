import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../api.service';

@Injectable()
export class FrontCollectionService extends ApiService {
    apiUrl = '/collections';
    getList(
        name: string,
        params?: { perNum?: number, page?: number}
    ) {
        const url = this.apiUrl + `/${name}`;
        params = this.parsePageParams(params);
        const options = { params: params };
        return this.httpGet(url, options);
    }
}
