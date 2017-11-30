import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaisService } from '../../services/pais/pais.service';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../data/cliente/Cliente';

@Component({
    selector: 'app-modalcliente',
    templateUrl: './modalcliente.component.html',
    styleUrls: ['./modalcliente.component.scss'],
    providers: [
        ClienteService,
        PaisService ]
})

export class ModalClienteComponent implements OnInit {
    @Input() cliente: Cliente;
    @Input() operacao: string;
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    closeResult: string;
    public pais: any[] = [];
    modalCliente: any;

    constructor(private modalService: NgbModal,
                private _clienteservice: ClienteService,
                private _paisservice: PaisService ) { }

    ngOnInit() {
    }

    open(content) {
        this._paisservice.getPaisValues()
            .subscribe(res => {
                this.pais = res;
            }, error => {
            this.notify(400, 'Erro ao obter a lista de paises');
        });
        // defaults
        if ( this.operacao === 'Inserir' ) {
            this.cliente = new Cliente();
            this._clienteservice.getClienteDefaults()
                .subscribe( res => {
                    this.cliente = res;
                    this.cliente.clinum = undefined;
                }, error => {
                    this.notify(400, 'Erro ao obter os defaults para o registo de clientes.');
                });
        }

        this.modalCliente = this.modalService.open(content, { size: 'lg' } );
        this.modalCliente.result.then((result) => {
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

    /* Regista ou modifica cliente conforme o tipo de operação */
    public RegModCliente() {
        if ( this.operacao === 'Inserir' ) {
            this._clienteservice.postClienteValues(this.cliente)
                .subscribe(res => {
                    this.cliente = res;
                    this.notify(200, 'O cliente foi registado com sucesso com o número ' + this.cliente.clinum);
                }, error => {
                    this.notify(400, 'Erro no Registo do cliente: ' + error._body);
                    });
        } else if ( this.operacao === 'Modificar' ) {
            this._clienteservice.putClienteValues(this.cliente)
                .subscribe(res => {
                    this.cliente = res;
                    this.notify(200, 'Cliente Modificado com Sucesso!');
            }, error => {
                this.notify(400, 'Erro na modificação do cliente: ' + error._body);
            });
        } else {
            this.cliente = new Cliente();
        }
        this.modalCliente.close();
    }

    notify(oStatus, aMensagem) {
        this.notifyParent.emit({ status: oStatus, msg: aMensagem});
    }
}
