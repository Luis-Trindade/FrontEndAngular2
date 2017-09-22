import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Contrato } from '../../data/contra/Contrato';
import { AppConfig } from '../config/app.config';

@Injectable()
export class ContraService {
    constructor ( private http: Http, private config: AppConfig) {}

    setContratosFromJsonArray(jsonArrayContratos) {
        const osContratos: Contrato[] = [];
        jsonArrayContratos.forEach( oItem => {
            const oContrato = new Contrato();
            oContrato.ctonum = oItem.ctonum;
            oContrato.cto2dat = oItem.cto2dat;
            oContrato.ctopraz = oItem.ctopraz;
            oContrato.ctotcon = oItem.ctotcon;
            osContratos.push(oContrato);
        });
        return osContratos;
    }

    getListaContratos(oStart: number, oTamanho: number, aSearch: string, aRestricao: string, aOrdenacao: any[]) {
        const restBaseUrl = 'http://' + this.config.getConfig('hostBridge') + ':' + this.config.getConfig('portBridge');
        let restUrlContratos = restBaseUrl + '/api/contra/short';
        const countUrlContratos = restBaseUrl + '/api/contra/count';
        let countFilteredUrlContratos = restBaseUrl + '/api/contra/count';

        let queryParams = '?';

        queryParams = queryParams + 'start=' + oStart;

        queryParams = queryParams + '&length=' + oTamanho;
        if ( aSearch ) {
            queryParams = queryParams + '&search[value]=' + aSearch;
        } else {
            queryParams = queryParams + '&search[value]='
        }

        queryParams = queryParams + '&restricao=' + aRestricao;
        console.log(aOrdenacao);
        if ( aOrdenacao.length > 0 ) {
            const ordem = '&order[0][column]=' + aOrdenacao[0].column + '&order[0][dir]=' + aOrdenacao[0].order;
            queryParams = queryParams + ordem;
        } else {
            queryParams = queryParams + '&order[0][column]=0&order[0][dir]=asc';
        }

        restUrlContratos = restUrlContratos + queryParams;
        countFilteredUrlContratos = countFilteredUrlContratos + queryParams;

        return this.http.get(restUrlContratos)
            .map((responseData) => {
                return this.setContratosFromJsonArray(responseData.json().data);
            });
    }
}
