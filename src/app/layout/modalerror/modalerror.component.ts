import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modalerror',
    templateUrl: './modalerror.component.html',
    styleUrls: ['./modalerror.component.scss']
})

export class ModalErrorComponent implements OnInit {
    @ViewChild('modalerror') modalError: ModalErrorComponent;
    @Input() Header: string;
    @Input() Mensagem: string;
    @Input() isError: boolean;
    isHidden: boolean;

    closeResult: string;

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
        this.isHidden = true;
    }

    open(isError: boolean, oHeader: string, aMsg: string) {
        this.isError = isError;
        this.Header = oHeader;
        this.Mensagem = aMsg;
        this.modalService.open(this.modalError, { size: 'sm' } ).result.then((result) => {
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
