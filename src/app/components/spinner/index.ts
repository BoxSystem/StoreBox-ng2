import { SamSpinService } from './service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-sam-spin',
    template: `
    <div class="app-text-center">
        <nz-spin [nzSpinning]="loading"></nz-spin>
    </div>
    `
})
export class SamSpinComponent {
    loading = true;
    constructor(spin: SamSpinService) {
        spin.status.subscribe((v) => {
            this.loading = v;
        });
    }
}
