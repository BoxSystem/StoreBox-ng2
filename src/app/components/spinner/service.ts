import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SamSpinService {
    _active = true;
    status = new Subject<boolean>();
    constructor() {}
    get active() {
        return this._active;
    }
    set active(v) {
        this._active = v;
        this.status.next(v);
    }
    start() {
        this.active = true;
    }
    stop() {
        this.active = false;
    }
}
