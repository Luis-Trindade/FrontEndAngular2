import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Cashflow } from '../../data/simul/Cashflow';

@Component({
    selector: 'app-modalcashflow',
    templateUrl: './modalcashflow.component.html',
    styleUrls: ['./modalcashflow.component.scss']

})

export class ModalCashflowComponent implements OnInit {
    @Input() cashflow: Cashflow[];

    closeResult: string;
    modalCashflow: any;

    constructor(private modalService: NgbModal ) { }

    ngOnInit() {
    }

    open(content) {
        this.modalCashflow = this.modalService.open(content, { size: 'lg' } );
        this.modalCashflow.result.then((result) => {
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

}
