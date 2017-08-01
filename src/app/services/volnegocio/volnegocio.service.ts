import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Config } from '../../data/config/config';

@Injectable()

export class VolNegocioService {
    cfg: Config = new Config();
    constructor ( private http: Http) {}

    getChartValues() {
        const barChartLabels: string[] = [];
        const dataPropostas: number[] = [];
        const dataContratos: number[] = [];

        const volNegocioUrl = 'http://' + this.cfg.getHost() + ':' + this.cfg.getPort() + '/api/clientes/mapas/volnegocio'
        return this.http.get(volNegocioUrl)
            .map((responseData) => {
                return responseData.json();
            })
            .map((chartResults: Array<any>) => {
                chartResults.forEach((element) => {
                    barChartLabels.push(element.ano);
                    dataPropostas.push(element.numprp);
                    dataContratos.push(element.numcto);
                });
                const barChartData = [
                    { data: dataPropostas, label: 'Propostas' },
                    { data: dataContratos, label: 'Contratos' }
                ];
                return { barChartLabels, barChartData };
            });
    }
}
