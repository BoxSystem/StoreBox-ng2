import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

interface Ibody {
    name: string;
    tags: string[];
    hidden: boolean;
}

@Injectable()
export class TagService extends ApiService {
    apiUrl = this.baseApiUrl + '/tags';
    cloud() {
        const url = this.apiUrl + '/cloud';
        return this.httpGet(url);
    }
    add(body: Ibody) {
        return super.add(body);
    }
    save(id, body: Ibody) {
        return super.save(id, body);
    }
}
