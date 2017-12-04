import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SimulRescService } from '../../services/simulresc/simulresc.service';
import { SimulacaoRescisao } from '../../data/simulresc/SimulacaoRescisao';
import { ModalErrorComponent } from '../modalerror/modalerror.component';

@Component({
    selector: 'app-simulresc',
    templateUrl: './simulresc.component.html',
    styleUrls: ['./simulresc.component.scss'],
    animations: [routerTransition()],
    providers: [ SimulRescService ]
})
export class SimulRescComponent implements OnInit {
    @ViewChild('modalerror') modalError: ModalErrorComponent;
    simul: SimulacaoRescisao;
    // erros
    errorHeader: string;
    errorMessage: string;
    isError: boolean;

    constructor(private _simulrescservice: SimulRescService) {
    }

    ngOnInit() {
       this.simul = new SimulacaoRescisao();
    }

    fazSimulacaoRescisao() {
        this._simulrescservice.postSimulValues(this.simul)
            .subscribe(res => {
                this.simul = res;
            },
                err => {
                this.modalError.open(true, 'Erro', 'Erro na simulação do contrato: ' + err._body);
        });
    }

}
