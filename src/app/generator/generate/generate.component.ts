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

  valueSelect = [
    { value: 'string' },
    { value: 'number' },
    { value: 'array' },
  ];
  optionStatus = {
    value: ''
  }

  strin: string;
  arrayLiner: any[] = [];

  ngOnInit(): void {
    this.generateForms = this.generateFormsService.buildForm();
    this.nbrProperties = 0;
  }

  getGenerateFormControls() {
    return (<FormArray>this.generateForms.get('generateFormArray')).controls;
  }

  addGenerateForm(): void {
    this.generateFormsService.addGenerateForm(this.generateForms);
    this.nbrProperties ++;
  }

  creationMock() {

    this.generate = {
      title: this.generateForms.get('title').value,
      properties: this.generateForms.getRawValue().generateFormArray
    } as Generate;

    for (let index = 0; index < this.generate.properties.length; index++) {
      const element = this.generate.properties[index];
      switch (this.generate.properties[index].typeProperties) {
        case 'string':
          this.generate.properties[index].result = this.generateString()
          break;
        case 'number':
          this.generate.properties[index].result = this.generateNumber()
          break;
        default:
          break;
      }
    }

    this.attributeValue();
    this.watchValue = true;
  }

  attributeValue() {

    const nbrLiner = this.generateForms.get('nbrLiner').value;
    let i = 0;
    while (i < nbrLiner) {
      i++;
      this.arrayLiner.push(this.generate);
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
