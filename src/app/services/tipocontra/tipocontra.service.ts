import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppConfig } from '../config/app.config';

@Injectable()

export class TipoContraService {
    constructor ( private http: Http, private config: AppConfig) {}

    getTipoContraValues() {
        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/tipocontra/short';
        return this.http.get(serviceUrl)
            .map((responseData) => {
                return responseData.json();
            });
    }
}
