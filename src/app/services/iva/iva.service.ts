import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';

@Injectable()

export class IvaService {
    constructor ( private http: Http, private config: AppConfig) {}

    getIvaValues() {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/iva/short';
        return this.http.get(serviceUrl)
            .map((responseData) => {
                return responseData.json();
            });
    }
}
