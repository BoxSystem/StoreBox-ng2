import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient as Http, HttpHeaders as Headers } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class FileService extends ApiService {
    apiUrl = '';
    downloadUrl(cid: string, gid: string) {
        const url = `${this.apiUrl}/files/categories/${cid}/goods/${gid}`;
        return url;
    }
    list() {
        const url = `${this.apiUrl}/goods`;
        return this.httpGet(url);
    }
}
