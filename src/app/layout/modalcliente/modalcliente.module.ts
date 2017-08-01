import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalClienteComponent } from './modalcliente.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NifValidatorDirective } from '../../directives/validanif/validanif.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ModalClienteComponent, NifValidatorDirective],
    exports: [ModalClienteComponent]
})
export class ModalClienteModule { }
