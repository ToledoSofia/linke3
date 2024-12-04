import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-instrument-dialog',
  templateUrl: './add-instrument-dialog.component.html',
})
export class AddInstrumentDialogComponent {
  availableInstruments: any[] = [];
  selectedInstrument: number | null = null;
  newInstrumentName: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddInstrumentDialogComponent>,
    private http: HttpClient
  ) {
    this.loadAvailableInstruments();
  }

  loadAvailableInstruments() {
    this.http.get<any[]>('http://localhost:3000/api/instrumentos').subscribe(
      (data) => {
        this.availableInstruments = data;
      },
      (error) => {
        console.error('Error al cargar instrumentos', error);
      }
    );
  }

  addInstrument() {
    if (this.newInstrumentName.trim()) {
      this.http.post('http://localhost:3000/instrumentos', { nombre: this.newInstrumentName }).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al agregar instrumento', error);
        }
      );
    } else if (this.selectedInstrument) {
      this.dialogRef.close({ idInstrumento: this.selectedInstrument });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
