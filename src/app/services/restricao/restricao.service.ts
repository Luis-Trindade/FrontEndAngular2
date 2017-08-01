import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Config } from '../../data/config/config';

@Injectable()

export class RestricaoService {
    cfg: Config = new Config();
    constructor ( private http: Http) {}

    getRestricaoValues(aRestricao: string) {
        const serviceUrl = 'http://' + this.cfg.getHost() + ':' + this.cfg.getPort() + '/api/restricaoLst?listagem=' + aRestricao;
        return this.http.get(serviceUrl)
            .map((responseData) => {
                return responseData.json();
            });
    }
}
