import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../config/app.config';

@Injectable()

export class PaisService {
    constructor ( private http: Http, private config: AppConfig) {}

    getPaisValues() {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/pais/short';
        return this.http.get(serviceUrl)
            .map((responseData) => {
                return responseData.json();
            });
    }
}
