import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { VolNegocioService } from '../../services/volnegocio/volnegocio.service';
import { WeatherSettings, TemperatureScale, ForecastMode, WeatherLayout } from 'angular-weather-widget';

import { ModalErrorComponent } from '../modalerror/modalerror.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    providers: [ VolNegocioService ]
})
export class DashboardComponent implements OnInit {
    @ViewChild('modalerror') modalError: ModalErrorComponent;

    settings: WeatherSettings = {
        location: {
            cityName: 'Lisbon'
        },
        backgroundColor: '#ffffff',
        color: '#548abb',
        width: 'auto',
        height: 'auto',
        showWind: true,
        scale: TemperatureScale.CELCIUS,
        forecastMode: ForecastMode.GRID,
        showDetails: false,
        showForecast: true,
        layout: WeatherLayout.WIDE,
        language: 'pt'
    };

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: any[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType = 'bar';
    public barChartLegend = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Propostas' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Contratos' }
    ];
    public isDataAvailable = false;
    // erros
    errorHeader: string;
    errorMessage: string;
    isError: boolean;

    constructor(private _volnegocioservice: VolNegocioService) {

    }

    ngOnInit() {
        this._volnegocioservice.getChartValues()
            .subscribe(res => {
                this.barChartLabels = res.barChartLabels;
                this.barChartData = res.barChartData;
                this.isDataAvailable = true;
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter a os dados para o gráfico de volume de negócio.');
            });
    }
}
