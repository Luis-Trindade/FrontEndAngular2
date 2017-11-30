import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmComponent } from './modalconfirm.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports:        [ CommonModule,
                        TranslateModule ],
    declarations:   [ ModalConfirmComponent ],
    exports:        [ ModalConfirmComponent ]
})
export class ModalConfirmModule { }
