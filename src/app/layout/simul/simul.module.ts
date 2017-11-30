import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimulRoutingModule } from './simul-routing.module';
import { SimulComponent } from './simul.component';
import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { ModalErrorModule } from '../modalerror/modalerror.module';
import { ModalCashflowModule } from '../modalcashflow/modalcashflow.module';

@NgModule({
  imports: [
        CommonModule,
        SimulRoutingModule,
        NgbModule.forRoot(),
        FormsModule,
        ModalErrorModule,
        ModalCashflowModule,
        TranslateModule,
        PageHeaderModule
  ],
  declarations: [SimulComponent]
})
export class SimulModule { }
