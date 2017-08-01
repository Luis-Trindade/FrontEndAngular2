import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente/cliente.service';
import { RestricaoService } from '../../services/restricao/restricao.service';
import { SelectItem } from 'primeng/primeng';

import { ModalErrorComponent } from '../modalerror/modalerror.component';

import {Cliente} from '../../data/cliente/Cliente';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
    animations: [routerTransition()],
    providers: [
        ClienteService,
        RestricaoService
    ]
})
export class ClientesComponent implements OnInit {
    @ViewChild('modalerror') modalError: ModalErrorComponent;

    cliente: Cliente;
    clientes: Cliente[];
    operacao = 'Inserir';
    public restricao: SelectItem[];
    restricaoselected = '--';
    lastLazyEvent: any;
    totalRecords: number;
    errorHeader: string;
    errorMessage: string;
    isError: boolean;

    constructor(private _clienteservice: ClienteService,
                private _restricaoservice: RestricaoService,
                private parentRouter: Router) {
    }

    ngOnInit() {

        this.cliente = new Cliente();
        this.totalRecords = 100;
        this._clienteservice.getCountListaClientes('', '--' )
            .subscribe(res => {
               this.totalRecords = res;
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter a lista de clientes.');
            });
        this._restricaoservice.getRestricaoValues('CLIENT')
            .subscribe(res => {
                this.restricao = [ {label: '--', value: { codigo: '--'}} ];
                res.forEach(item => {
                    this.restricao.push({label: item.codigo, value: { codigo: item.codigo}});
                });
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter a lista de restrições.');
            });

    }

    loadPaginaCliente(oEvento) {
        this.parentRouter.navigateByUrl('/cliente/' + oEvento.data.clinum);
    }

    forceLoadData(oEvento) {
        this.restricaoselected = oEvento.value.codigo;
        this.loadData(this.lastLazyEvent);
    }

    loadData(oEvento) {
        this.lastLazyEvent = oEvento;
        /** falta fazer o search e filtros **/
        /*console.log('Carrega Novos Dados');
        console.log('First ' + oEvento.first);
        console.log('Rows ' + oEvento.rows);
        console.log('SortField ' + oEvento.sortField);
        console.log('SortOrder' + oEvento.sortOrder);
        console.log('Filters' + oEvento.filters);*/
        let aOrdenacao = {};
        const oArrayOrder = [];
        let sortOrder = 'asc';
        if ( oEvento.sortOrder > 0 ) {
            sortOrder = 'asc';
        } else {
            sortOrder = 'desc';
        }
        switch ( oEvento.sortField) {
            case 'clinum': {
                aOrdenacao = { column: 0, order: sortOrder};
                oArrayOrder.push(aOrdenacao);
                break;
            }
            case 'clinom': {
                aOrdenacao = { column: 1, order: sortOrder};
                oArrayOrder.push(aOrdenacao);
                break;
            }
            case 'clitlx': {
                aOrdenacao = { column: 2, order: sortOrder};
                oArrayOrder.push(aOrdenacao);
                break;
            }
            case 'clitel': {
                aOrdenacao = { column: 3, order: sortOrder};
                oArrayOrder.push(aOrdenacao);
                break;
            }
            case 'clinfis': {
                aOrdenacao = { column: 4, order: sortOrder};
                oArrayOrder.push(aOrdenacao);
                break;
            }
            default: {
                aOrdenacao = { };
                break;
            }
        }
        this._clienteservice.getCountListaClientes(oEvento.globalFilter, this.restricaoselected)
            .subscribe(res => {
                this.totalRecords = res;
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter a lista de clientes.');
            });
        this._clienteservice.getListaClientes(oEvento.first, oEvento.rows, oEvento.globalFilter, this.restricaoselected, oArrayOrder)
            .subscribe(res => {
                this.clientes = res;
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter a lista de clientes.');
            });
    }

    getNotificationFromRegister(oEvento) {
        if ( oEvento.status === 200 ) {
            this.modalError.open(false, 'Cliente Registado', oEvento.msg);
        } else {
            this.modalError.open(true, 'Erro no registo do cliente', oEvento.msg);
        }
    }

}
