import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalErrorComponent } from './modalerror.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports:        [ CommonModule,
                        TranslateModule ],
    declarations:   [ ModalErrorComponent ],
    exports:        [ ModalErrorComponent ]
})
export class ModalErrorModule { }
