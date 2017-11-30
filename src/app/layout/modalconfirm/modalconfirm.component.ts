import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modalconfirm',
    templateUrl: './modalconfirm.component.html',
    styleUrls: ['./modalconfirm.component.scss']
})

export class ModalConfirmComponent implements OnInit {
    @ViewChild('modalconfirm') modalConfirm: ModalConfirmComponent;
    @Input() Mensagem: string;
    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    isHidden: boolean;


    closeResult: string;
    modalJanela: any;

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
        this.isHidden = true;
    }

    open(aMsg: string) {
        this.Mensagem = aMsg;
        this.modalJanela = this.modalService.open(this.modalConfirm, { size: 'sm' } );
        this.modalJanela.result.then((result) => {
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

    notify(result: boolean) {
        this.notifyParent.emit(result );
    }

    clickedOK() {
        this.notify(true);
        this.modalJanela.close();
    }

    clickedCancel() {
        this.notify(false);
        this.modalJanela.close();
    }
}
