import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { IvaService } from '../../services/iva/iva.service';
import { SimulService } from '../../services/simul/simul.service';
import { Simulacao } from '../../data/simul/Simulacao';
import { ModalErrorComponent } from '../modalerror/modalerror.component';

@Component({
    selector: 'app-simul',
    templateUrl: './simul.component.html',
    styleUrls: ['./simul.component.scss'],
    animations: [routerTransition()],
    providers: [ IvaService,
                SimulService ]
})
export class SimulComponent implements OnInit {
    @ViewChild('modalerror') modalError: ModalErrorComponent;
    simul: Simulacao;
    public iva: any[] = [];
    // erros
    errorHeader: string;
    errorMessage: string;
    isError: boolean;

    constructor(private _ivaservice: IvaService,
                private _simulservice: SimulService) {
    }

    ngOnInit() {
        this._ivaservice.getIvaValues()
            .subscribe(res => {
                this.iva = res;
            });
        this.simul = new Simulacao();
    }

    fazSimulacao() {
        this._simulservice.postSimulValues(this.simul)
            .subscribe(res => {
                this.simul = res;
            },
                err => {
                this.modalError.open(true, 'Erro', 'Erro na simulação de rendas: ' + err._body);
        });
    }

    preencheGrupoRendasAuto() {
        if (this.simul.ctopraz > 0 && this.simul.ctoper > 0) {
            if (!this.simul.gruporendas[0].quantidade) {
                this.simul.gruporendas[0].quantidade = this.simul.ctopraz / this.simul.ctoper;
                this.simul.gruporendas[0].factor = 1;
            }
        }
    }

}
