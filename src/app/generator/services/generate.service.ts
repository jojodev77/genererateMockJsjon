import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generate } from '../generate/model/generate.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  constructor() { }

  saveObjectToSessionStorage(object: any) {

    sessionStorage.setItem('generate', object)
  }

  getObjectToSessionStorage() {
   return  sessionStorage.getItem('generate');
  }

  deleteObjectToSessionStorage() {
    sessionStorage.removeItem('generate')
  }
}
