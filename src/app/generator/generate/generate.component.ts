import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { GeneratorFormsService } from '../services/generator-forms.service';
import { GenerateService } from '../services/generate.service';

import { Generate } from './model/generate.model';
import { stringData } from './data/string.data';
import { number_data } from './data/number.data';


import { of, Subject, Subscription } from 'rxjs';
import { concatMap, repeat } from 'rxjs/operators';




@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit, AfterViewChecked {

  constructor(
    private generateFormsService: GeneratorFormsService,
    private generateService: GenerateService
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

  resultSubscription: Subscription;
  result$ = new Subject<any>();
  disabledButton: boolean;

  objectSubscription: Subscription;

  ngOnInit(): void {
    this.generateForms = this.generateFormsService.buildForm();
    this.nbrProperties = 0;
    this._configForms();
  }

  ngAfterViewChecked() {
    let i = 6;

  }

  getGenerateFormControls() {
    return (<FormArray>this.generateForms.get('generateFormArray')).controls;
  }

  addGenerateForm(): void {
    this.generateFormsService.addGenerateForm(this.generateForms);
    this.nbrProperties++;
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

      // if (this.generate !== null) {
      //   setTimeout(() => {
      //     this._recupObject()
      //   }, 2000);
      // }
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
      let i = 0;
      const element = this.stringData[this._generateStringAleatory()];
      const elArray = [];
      elArray.push(element);
      for (let index = 0; index < elArray.length; index++) {
        this.valueAny = elArray[index];
        const letterAleatoryLenght = of(element).pipe(repeat(3));
        this.result$.next(letterAleatoryLenght);
        this.resultSubscription = this.result$.pipe(
          concatMap(x => x)
        ).subscribe(
          (data: any) => { this.valueAny = data }
        )

      }
    }
    return this.valueAny;
  }


  generateNumber() {
    for (let index = 0; index < this.numberData.length; index++) {
      const element = this.numberData[this._generateNbrAleatory()];
      const elArray = [];
      elArray.push(element)
      for (let index = 0; index < elArray.length; index++) {
        this.valueAny = elArray[index];
      }
    }
    return this.valueAny;
  }

  reinitiateResult() {
    this.generateForms.reset();
    this.generate = null;
    this.watchValue = false;
  }

  saveObject() {
    this.generateService.saveObjectToSessionStorage(JSON.stringify(this.generate));
  }

  private _generateNbrAleatory() {
    let numberAleatory;
    for (let index = 0; index < this.numberData.length; index++) {
      numberAleatory = Math.floor(index * Math.random());
    }
    return numberAleatory;
  }

  private _generateStringAleatory() {
    let stringAleatory;
    for (let index = 0; index < this.stringData.length; index++) {
      stringAleatory = Math.floor(index * Math.random());
    }
    return stringAleatory;
  }

  private _configForms() {
    this.generateForms.get('nbrLiner').disable();
    this.disabledButton = false;

    this.generateForms.get('title').valueChanges.subscribe(
      (data) => {
        if (data !== null) {
          this.generateForms.get('nbrLiner').enable()
          this.generateForms.get('nbrLiner').setValue(1);
          this.disabledButton = true;
        }
      }
    )

    this.generateForms.get('nbrLiner').valueChanges.subscribe(
      (data) => {
        if (data < 1) {
          this.generateForms.get('nbrLiner').setValue(1)
        }
      }
    )
  }

  recupObject() {
    this.generateForms.reset();
    this.generate = null;
    let obj: Generate = JSON.parse(this.generateService.getObjectToSessionStorage());

    this.generate = {
      title: obj.title ,
      properties: obj.properties
    } as any;

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
  }


}
