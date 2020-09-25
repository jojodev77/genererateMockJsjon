import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalComponentComponent } from '../modal-component/modal-component.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialogRef: MatDialogRef<ModalComponentComponent>;

  constructor(private dialog: MatDialog) { }

   /**
     * Affiche la modal de service indisponible
     */
    openModalServiceCreationobject(error?: any, succes?: any) {
      this.dialogRef = this.dialog.open(ModalComponentComponent, {
          height: '255px',
          panelClass: 'no-padding-dialog',
          disableClose: true,
          data: {
              instance: 'creation-succes',
              returnedError: error
          }
      });
  }

  openModalServiceCreationobjectError(error?: string, succes?: any) {
    this.dialogRef = this.dialog.open(ModalComponentComponent, {
        height: '255px',
        panelClass: 'no-padding-dialog',
        disableClose: true,
        data: {
            instance: 'creation-error',
            returnedError: error
        }
    });
}
}
