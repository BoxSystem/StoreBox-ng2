import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    styleUrls: ['./index.css'],
    selector: 'app-password-eye',
    templateUrl: './index.html'
})
export class SamPasswordEyeComponent {
    @Input() value: any;
    @Output() valueChange = new EventEmitter();
    @Input() size: string;
    @Input() name: string;
    @Input() PlaceHolder: string;
    public icon = 'anticon-eye';
    public type = 'password';
    private passwordType = 'password';
    private textType = 'text';
    private closeEye = 'anticon-eye';
    private openEye = `${this.closeEye}-o`;
    constructor() {
        this.size = this.size ? this.size : 'large';
    }
    emitVal() {
        this.valueChange.emit(this.value);
    }
    toggle() {
        if (this.type === this.passwordType) {
            this.type = this.textType;
            this.icon = this.openEye;
        } else {
            this.type = this.passwordType;
            this.icon = this.closeEye;
        }
    }
}
