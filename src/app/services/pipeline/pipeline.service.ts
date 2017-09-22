import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../config/app.config';

@Injectable()

export class PipelineService {
    constructor ( private http: Http, private config: AppConfig) {}

    getChartValues() {
        const doughnutChartLabels: string[] = [];
        const doughnutChartData: number[] = [];

        const serviceUrl =
            'http://' +
            this.config.getConfig('hostBridge') +
            ':' + this.config.getConfig('portBridge') +
            '/api/clientes/mapas/pipeline';

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
