import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    styleUrls: ['./index.css'],
    selector: 'app-password-eye',
    templateUrl: './index.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SamPasswordEyeComponent),
            multi: true
        }
    ]
})
export class SamPasswordEyeComponent implements ControlValueAccessor {
    private _value: any;
    @Input() size: string;
    @Input() placeholder: string;
    private passwordType = 'password';
    private textType = 'text';
    public type = this.passwordType;
    private closeEye = 'anticon-eye';
    private openEye = `${this.closeEye}-o`;
    public iconClass = this.closeEye;
    constructor() {
        this.size = this.size ? this.size : 'large';
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (this._value !== v) {
            this._value = v;
            this.onChange(this._value);
        }
    }
    toggle() {
        if (this.type === this.passwordType) {
            this.type = this.textType;
            this.iconClass = this.openEye;
        } else {
            this.type = this.passwordType;
            this.iconClass = this.closeEye;
        }
    }
    onChange = (_: any) => { }
    onTouched = (_: any) => { }
    // From ControlValueAccessor interface
    writeValue(value: any) {
        this._value = value;
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
}
