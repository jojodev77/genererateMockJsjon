import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { GeneratorFormsService } from '../services/generator-forms.service';

import { Generate } from './model/generate.model';
import { stringData } from './data/string.data';
import { number_data } from './data/number.data';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  constructor(
    private generateFormsService: GeneratorFormsService
  ) { }

  generateForms: FormGroup;
  nbrProperties: number;
  generate: Generate;
  watchValue = false;

  valueString: string;
  valueNumber: number;
  valueArray: [] = [];
  stringData = stringData;
  numberData = number_data;

  valueAny: any;

  ngOnInit(): void {
    this.generateForms = this.generateFormsService.buildForm();
    this.nbrProperties = 1;
  }

  getGenerateFormControls() {
    return (<FormArray>this.generateForms.get('generateFormArray')).controls;
  }

  addGenerateForm(): void {
    this.generateFormsService.addGenerateForm(this.generateForms);
  }

  creationMock() {
    this.generate = {
      title: this.generateForms.get('title').value,
      properties: this.generateForms.getRawValue().generateFormArray
    } as Generate;

    this.generateString();
    this.watchValue = true;
  }

  attributeValue() {
    switch (this.generateForms.get('nbrLiner').value) {
      case 'string':
    this.generateString();
        break;
      case 'number':
      this.generateNumber();
        break;

      case 'array':

        break;

      default:
        break;
    }
  }

  generateString() {
    for (let index = 0; index < this.stringData.length; index++) {
      const letterAleatory = Math.floor(index * Math.random());
      let i = 0;
      while (i < 5) {
        i++;
        const element = this.stringData[letterAleatory];
        const elArray = [];
        elArray.push(element)
        for (let index = 0; index < elArray.length; index++) {
          this.valueAny = elArray[index];
        }
      }
    }
    return this.valueAny;
  }


  generateNumber() {
    for (let index = 0; index < this.numberData.length; index++) {
      const numberAleatory = Math.floor(index * Math.random());
      let i = 0;
      while (i < 5) {
        i++;
        const element = this.numberData[numberAleatory];
        const elArray = [];
        elArray.push(element)
        for (let index = 0; index < elArray.length; index++) {
          this.valueAny = elArray[index];
        }
      }
    }
    return this.valueAny;
  }

}
