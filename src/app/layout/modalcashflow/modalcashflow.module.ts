import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalCashflowComponent } from './modalcashflow.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [ ModalCashflowComponent ],
    exports: [ ModalCashflowComponent ]
})
export class ModalCashflowModule { }
