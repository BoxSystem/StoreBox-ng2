import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    styleUrls: ['./index.css'],
    templateUrl: './index.html'
})
export class UserComponent implements OnInit {
    _dataSet = []
    _loading = true
    _total = 1
    _current = 1
    constructor(private user: UserService) {}
    ngOnInit() {
        this.user.get().subscribe((data: any) => {
            this._loading = false
            this._dataSet = data
            this._total = data.length
        })
    }
    del(data) {
        this.user.del(data._id).subscribe(console.log)
    }
    allow(data) {
        this.user.allow(data._id).subscribe(() => data.active = true)
    }
    ban(data) {
        this.user.ban(data._id).subscribe(() => data.active = false)
    }
    add() {

    }
    changePwd(data) {

    }
}
