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
    prefixUrl = this.apiUrl + '/users'
    get() {
        return this.httpGet(this.prefixUrl)
    }
    add(username, password) {
        let body = {
            username: username,
            password: password
        }
        return this.httpPost(this.prefixUrl, body)
    }
    del(id) {
        let url = `${this.prefixUrl}/${id}/delete`
        return this.httpGet(url)
    }
    ban(id) {
        let url = `${this.prefixUrl}/${id}/ban`
        return this.httpGet(url)
    }
    allow(id) {
        let url = `${this.prefixUrl}/${id}/allow`
        return this.httpGet(url)
    }
    changePassword(id, oldPassword, newPassword) {
        let url = `${this.prefixUrl}/${id}/password`
        let body = {
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }
        return this.httpPost(url, body)
    }
}
