import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimulRescRoutingModule } from './simulresc-routing.module';
import { SimulRescComponent } from './simulresc.component';
import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';

import { ZoomContratoModule } from '../zoomcontrato/zoomcontrato.module';
import { ModalErrorModule } from '../modalerror/modalerror.module';

@NgModule({
  imports: [
        CommonModule,
        SimulRescRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ModalErrorModule,
        TranslateModule,
        ZoomContratoModule,
        PageHeaderModule
  ],
  declarations: [SimulRescComponent]
})
export class SimulRescModule { }
