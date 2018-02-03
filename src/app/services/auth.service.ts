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
export class AuthService extends ApiService {
    apiUrl = this.baseApiUrl + '/auth'
    login(username, password) {
        let url = this.apiUrl + '/login'
        return this.httpPost(url, {username: username, password: password})
    }
    logout() {
        let url = this.apiUrl + '/logout'
        return this.httpGet(url)
    }
}
