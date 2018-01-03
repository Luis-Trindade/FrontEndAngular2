import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalChartLinesComponent } from './modalchartlines.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        TranslateModule
    ],
    declarations: [ ModalChartLinesComponent ],
    exports: [ ModalChartLinesComponent ]
})
export class ModalChartLinesModule { }
