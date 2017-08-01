import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Config } from '../../data/config/config';

@Injectable()

export class PipelineService {
    cfg: Config = new Config();
    constructor ( private http: Http) {}

    getChartValues() {
        const doughnutChartLabels: string[] = [];
        const doughnutChartData: number[] = [];

        const serviceUrl = 'http://' + this.cfg.getHost() + ':' + this.cfg.getPort() + '/api/clientes/mapas/pipeline';
        return this.http.get(serviceUrl)
            .map((responseData) => {
                return responseData.json();
            })
            .map((chartResults: Array<any>) => {
                chartResults.forEach((element) => {
                    doughnutChartLabels.push(element.label);
                    doughnutChartData.push(element.value);
                });
                return { doughnutChartLabels, doughnutChartData };
            });
    }
}
