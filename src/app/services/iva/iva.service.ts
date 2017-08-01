import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../data/config/config';

@Injectable()

export class IvaService {
    cfg: Config = new Config();
    constructor ( private http: Http) {}

    getIvaValues() {
        const serviceUrl = 'http://' + this.cfg.getHost() + ':' + this.cfg.getPort() + '/api/iva/short';
        return this.http.get(serviceUrl)
            .map((responseData) => {
                return responseData.json();
            });
    }
}
