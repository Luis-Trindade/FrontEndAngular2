import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalCashflowComponent } from './modalcashflow.component';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [ ModalCashflowComponent ],
    exports: [ ModalCashflowComponent ]
})
export class ModalCashflowModule { }
