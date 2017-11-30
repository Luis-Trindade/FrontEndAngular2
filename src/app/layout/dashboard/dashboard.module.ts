import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalErrorModule } from '../modalerror/modalerror.module';
import { AngularWeatherWidgetModule, WeatherApiName } from 'angular-weather-widget';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        NgbModule.forRoot(),
        DashboardRoutingModule,
        ModalErrorModule,
        TranslateModule,
        AngularWeatherWidgetModule.forRoot({
            key: '6db95282debf29f37dc2b26cd07f8fb3',
            name: WeatherApiName.OPEN_WEATHER_MAP,
            baseUrl: 'http://api.openweathermap.org/data/2.5'
        })
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
