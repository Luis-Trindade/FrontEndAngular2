import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ZoomContratoComponent } from './zoomcontrato.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule
    ],
    declarations: [ZoomContratoComponent],
    exports: [ZoomContratoComponent]
})
export class ZoomContratoModule { }
