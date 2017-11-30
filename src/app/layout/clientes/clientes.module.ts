import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule } from 'primeng/primeng';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { PageHeaderModule } from '../../shared';
import { ModalClienteModule } from '../modalcliente/modalcliente.module';
import { ModalErrorModule } from '../modalerror/modalerror.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
      CommonModule,
      NgbModule.forRoot(),
      PageHeaderModule,
      InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule,
      ClientesRoutingModule,
      TranslateModule,
      ModalClienteModule,
      ModalErrorModule
  ],
  declarations: [
      ClientesComponent
    ]
})
export class ClientesModule { }
