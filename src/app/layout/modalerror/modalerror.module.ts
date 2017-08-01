import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalErrorComponent } from './modalerror.component';


@NgModule({
    imports:        [ CommonModule ],
    declarations:   [ ModalErrorComponent ],
    exports:        [ ModalErrorComponent ]
})
export class ModalErrorModule { }
