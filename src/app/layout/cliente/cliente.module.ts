import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { PageHeaderModule } from '../../shared';
import { ModalClienteModule } from '../modalcliente/modalcliente.module';
import { ModalErrorModule } from '../modalerror/modalerror.module';
import { ModalConfirmModule } from '../modalconfirm/modalconfirm.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
        CommonModule,
        NgbModule.forRoot(),
        Ng2Charts,
        ClienteRoutingModule,
        InputTextModule, DataTableModule, ButtonModule, DialogModule,
        TranslateModule,
        ModalClienteModule,
        ModalErrorModule,
        ModalConfirmModule,
        PageHeaderModule
  ],
  declarations: [
      ClienteComponent
    ]
})
export class ClienteModule { }
