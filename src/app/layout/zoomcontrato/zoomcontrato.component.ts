import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ContraService } from '../../services/contra/contra.service';
import { TipoContraService } from '../../services/tipocontra/tipocontra.service';
import { Contrato } from '../../data/contra/Contrato';
import { TipoContra } from '../../data/tipocontra/TipoContra';

@Component({
    selector: 'app-zoomcontrato',
    templateUrl: './zoomcontrato.component.html',
    styleUrls: ['./zoomcontrato.component.scss'],
    providers: [ ContraService,
                TipoContraService ]
})

export class ZoomContratoComponent implements OnInit {
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    closeResult: string;
    zoomContrato: any;
    contrato: Contrato;
    contratos: Contrato[];
    tipocontra: TipoContra[];
    valueSelected: number;
    mensagemNumeroContratos: string;

    constructor(private modalService: NgbModal,
                private _contratoservice: ContraService,
                private _tipocontraservice: TipoContraService
                ) { }

    ngOnInit() {
    }

    open(content) {
        // defaults
        this._tipocontraservice.getTipoContraValues()
            .subscribe(res => {
                this.tipocontra = res;
            }, error => {
                this.notify(400, 'Erro ao obter a lista de tipos de contrato');
            });
        this.contrato = new Contrato();
        this.valueSelected = 0;
        this.mensagemNumeroContratos = '';
        this.zoomContrato = this.modalService.open(content, { size: 'lg' } );
        this.zoomContrato.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    public SeleccionaContrato() {
        this.notify(200, this.contrato.ctonum);
        this.zoomContrato.close();
    }

    public AnteriorContrato() {
        if ( this.contratos.length > 0 && this.valueSelected > 0 ) {
            this.valueSelected -= 1;
            this.mensagemNumeroContratos = 'Contrato ' + (this.valueSelected + 1) +  ' de ' + (this.contratos.length + 1);
            this.contrato = this.contratos[this.valueSelected];
        }
    }

    public SeguinteContrato() {
        if ( this.contratos.length > 0 && this.valueSelected < this.contratos.length ) {
            this.valueSelected += 1;
            this.mensagemNumeroContratos = 'Contrato ' + (this.valueSelected + 1) +  ' de ' + this.contratos.length;
            this.contrato = this.contratos[this.valueSelected];
        }
    }

    notify(oStatus, aMensagem) {
        this.notifyParent.emit({ status: oStatus, msg: aMensagem});
    }

    updateDescricao(oEvento: any) {
        this.tipocontra.forEach((tipocontra, index) => {
            if (tipocontra.codigo === oEvento ) {
                this.contrato.descricao = tipocontra.descricao
            }
        });
    }

    getContraFromServer() {
        let aPesquisa;
        aPesquisa = '';
        if ( this.contrato.ctonum > 0 ) {
            aPesquisa = aPesquisa + '&ctonum=' + this.contrato.ctonum;
        }
        if ( this.contrato.ctocli > 0 ) {
            aPesquisa = aPesquisa + '&ctocli=' + this.contrato.ctocli;
        }
        if ( this.contrato.ctostatus > 0 || this.contrato.ctostatus === 0 ) {
            aPesquisa = aPesquisa + '&ctostatus=' + this.contrato.ctostatus;
        }
        if ( this.contrato.ctoncon > 0 || this.contrato.ctoncon === 0 ) {
            aPesquisa = aPesquisa + '&ctoncon=' + this.contrato.ctoncon;
        }
        if ( this.contrato.ctosub > 0 || this.contrato.ctosub === 0 ) {
            aPesquisa = aPesquisa + '&ctosub=' + this.contrato.ctosub;
        }
        if ( this.contrato.ctotipo != null && this.contrato.ctotipo.length > 0 ) {
            aPesquisa = aPesquisa + '&ctotipo=' + this.contrato.ctotipo;
        }
        this._contratoservice.getListaContratos(0, 99999, '', '--', [], aPesquisa)
            .subscribe(res => {
                this.contratos = res;
                this.valueSelected = 0;
                if (this.contratos.length > 0) {
                    this.contrato = this.contratos[this.valueSelected];
                    this.mensagemNumeroContratos = 'Contrato ' + (this.valueSelected + 1) +  ' de ' +   this.contratos.length;
                } else {
                    this.contrato = new Contrato();
                }
            }, error => {
                this.notify(400, 'Erro ao obter a lista de contratos.');
            });
    }
}
