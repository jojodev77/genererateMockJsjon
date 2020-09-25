import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {modalTypesConfig} from './message-type-config';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit {

  status: string;
  action: string;
  selectedModalType: any;
  modalMessage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    public dialogRef: MatDialogRef<ModalComponentComponent>
  ) { }

  ngOnInit(): void {
    this.selectedModalType = modalTypesConfig[this.passedData.instance];
    this.modalMessage = this.passedData.returnedError
    let message = this.selectedModalType.message;
    if (this.passedData.nomFichier !== null) {
        message = message.replace(
            '{{ nomFichier }}',
            this.passedData.nomFichier
        );
    }
  }

  annuler(): void {
    this.dialogRef.close();
}

quitter(): void {
    this.dialogRef.close(this.selectedModalType.callback);
}


}
