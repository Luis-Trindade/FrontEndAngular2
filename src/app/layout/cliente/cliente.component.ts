import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PipelineService } from '../../services/pipeline/pipeline.service';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ContraService } from '../../services/contra/contra.service';
import {ActivatedRoute, Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ModalErrorComponent } from '../modalerror/modalerror.component';
import { ModalConfirmComponent } from '../modalconfirm/modalconfirm.component';

import { Cliente } from '../../data/cliente/Cliente';
import { Contrato } from '../../data/contra/Contrato';

@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.scss'],
    animations: [routerTransition()],
    providers: [
        PipelineService,
        ContraService,
        ClienteService
    ]
})
export class ClienteComponent implements OnInit, OnDestroy {
    @ViewChild('modalerror') modalError: ModalErrorComponent;
    @ViewChild('modalconfirm') modalConfirm: ModalConfirmComponent;

    public cliente: Cliente;
    contratos: Contrato[];
    operacao = 'Modificar';
    private sub: any;
    public addressMap: string;
    // Doughnut
    public doughnutChartLabels: string[] = ['Leasing', 'Imobiliário', 'Crédito', 'Renting'];
    public doughnutChartData: number[] = [350, 450, 100, 200];
    public doughnutChartType = 'doughnut';
    public isDataAvailable = false;
    // erros
    errorHeader: string;
    errorMessage: string;
    confirmMessage: string;
    isError: boolean;

    constructor(private _pipelineservice: PipelineService,
                private _clienteservice: ClienteService,
                private _contraservice: ContraService,
                private route: ActivatedRoute,
                private parentRouter: Router,
                private _sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.cliente = new Cliente();
        this.sub = this.route.params.subscribe(params => {
            this.cliente.clinum = +params['id'];
            this._clienteservice.getCliente(this.cliente.clinum)
                .subscribe(res => {
                    console.log(JSON.stringify(res));
                    this.cliente = res;
                    this.addressMap =
                        'https://www.google.com/maps/embed/v1/place?key=AIzaSyB8G1i2Hwt_PIhC7LtRnBWQolyXhPbtjZE&q=+' +
                        this.cliente.climor + ' ' + this.cliente.cliloc;
                }, error => {
                    this.modalError.open(true, 'Erro', 'Erro ao obter o cliente.');
                });
        });


        this._pipelineservice.getChartValues(this.cliente.clinum)
            .subscribe(res => {
                this.doughnutChartLabels = res.doughnutChartLabels;
                this.doughnutChartData = res.doughnutChartData;
                this.isDataAvailable = true;
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter os valores para o gráfico circular.');
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    loadDataContratos( oEvento ) {
        const queryAnd = '&ctocli=' + this.cliente.clinum;
        this._contraservice.getListaContratos(oEvento.first, oEvento.rows, '', '--', [], queryAnd )
            .subscribe(res => {
                this.contratos = res;
            }, error => {
                this.modalError.open(true, 'Erro', 'Erro ao obter a lista de contratos.');
            });
    }

    deleteCliente() {
        this.modalConfirm.open('Deseja apagar o cliente ' + this.cliente.clinum + '?');
    }

    getNotificationFromModify(oEvento) {
        if ( oEvento.status === 200 ) {
            this.modalError.open(false, 'Cliente Modificado', oEvento.msg);
        } else {
            this.modalError.open(true, 'Erro na modificação do cliente', oEvento.msg);
        }
    }

    getNotificationFromConfirm(oEvento) {
        if ( oEvento ) {
            this._clienteservice.deleteCliente(this.cliente.clinum)
                .subscribe(res => {
                    this.modalError.open(false, 'Cliente Apagado', 'O cliente ' + this.cliente.clinum + ' foi apagado com sucesso.');
                    this.parentRouter.navigateByUrl('/clientes');
                }, err => {
                    this.modalError.open(true, 'Erro', 'Erro ao apagar o cliente ' + this.cliente.clinum + ': ' + err._body);
                });
        }
    }

    mapURL() {
        return this._sanitizer.bypassSecurityTrustResourceUrl(this.addressMap);
    }
}
