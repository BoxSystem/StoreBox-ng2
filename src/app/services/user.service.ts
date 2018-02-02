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
export class UserService extends ApiService {
    apiUrl = this.baseApiUrl + '/users'
    add(username, password) {
        let body = {
            username: username,
            password: password
        }
        return this.httpPost(this.apiUrl, body)
    }
    del(id) {
        let url = `${this.apiUrl}/${id}/delete`
        return this.httpGet(url)
    }
    ban(id) {
        let url = `${this.apiUrl}/${id}/ban`
        return this.httpGet(url)
    }
    allow(id) {
        let url = `${this.apiUrl}/${id}/allow`
        return this.httpGet(url)
    }
    changePassword(id, oldPassword, newPassword) {
        let url = `${this.apiUrl}/${id}/password`
        let body = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
        return this.httpPost(url, body)
    }
}
