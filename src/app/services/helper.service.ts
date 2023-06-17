import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private _http: HttpClient) {}

  saveToPdf(pdfFileHtml: any): void {
    const pdfContent: string = pdfFileHtml;
    const pdfBlob: Blob = new Blob([pdfContent], { type: 'application/pdf' });
    const formData: FormData = new FormData();
    formData.append('pdfFile', pdfBlob, 'fatura.pdf');
    this._http.post('/Rentals/receive-pdf', formData, {
      responseType: 'text',
    });
  }
}
