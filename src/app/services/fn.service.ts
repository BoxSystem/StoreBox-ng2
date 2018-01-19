import { Injectable } from '@angular/core';



@Injectable()
export class FnService {
    private loginSessKey = 'user'
    setUserSess(data: object) {
        window.sessionStorage.setItem(this.loginSessKey, JSON.stringify(data))
    }
    getUserSess() {
        return JSON.parse(window.sessionStorage.getItem(this.loginSessKey))
    }
    clearUserSess() {
        window.sessionStorage.removeItem(this.loginSessKey)
    }
}
