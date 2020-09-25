import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { GeneratorFormsService } from '../services/generator-forms.service';
import { GenerateService } from '../services/generate.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Generate } from './model/generate.model';
import { stringData } from './data/string.data';
import { number_data } from './data/number.data';


import { Observable, of, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { isNullOrUndefined } from 'util';





@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit, AfterViewChecked {

  constructor(
    private generateFormsService: GeneratorFormsService,
    private generateService: GenerateService,
    private modalService: ModalService
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

  saveObjectStatus = false;
  dataInSession = false;

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



    if (this.generateForms.get('title').value) {
      this.attributeGenerate();
    }

    if ((<FormArray>this.generateForms.get('generateFormArray')).length === 0) {
      this.modalService.openModalServiceCreationobjectError('Aucune propriété crée');
    }

    if ((<FormArray>this.generateForms.get('generateFormArray')).length !== 0) {
      if (this.generate.properties[0].titleProperties && this.generate.properties[0].typeProperties) {
        this.modalService.openModalServiceCreationobject();
        this.generateString()
        this.attributeValue();
        this.watchValue = true;
      }
    }

    if ((<FormArray>this.generateForms.get('generateFormArray')).length !== 0) {
      if (!this.generate.properties[0].titleProperties) {
        this.modalService.openModalServiceCreationobjectError('Objet vide: Nom manquant');
      }
    }

    if ((<FormArray>this.generateForms.get('generateFormArray')).length !== 0) {
      if (!this.generate.properties[0].typeProperties) {
        this.modalService.openModalServiceCreationobjectError('Objet vide: Type manquant');
      }
    }



  }

  attributeGenerate() {
    this.generate = {
      title: this.generateForms.get('title').value,
      properties: this.generateForms.getRawValue().generateFormArray
    } as Generate
  }

  attributeValue() {

    this.arrayLiner = []
    const nbrLiner = this.generateForms.get('nbrLiner').value;
    let i = 0;
    while (i < nbrLiner) {
      i++;
      for (let index = 0; index < this.generate.properties.length; index++) {
        switch (this.generate.properties[index].typeProperties) {
          case 'string':
            let repeat = new Observable<any>(observer => {
              setInterval(() => observer.next(this.generateString()), 100);
            });
            repeat.pipe(
              take(3)
            ).subscribe(
              (data => {

                this.generate.properties[index].result = data
              })
            )
            // this.generate.properties[index].result = this.generateString()
            break;
          case 'number':
            this.generate.properties[index].result = this.generateNumber()
            break;
          default:
            break;
        }
        this.saveObjectStatus = true;
      }
      this.arrayLiner.push(this.generate);
    }



  }

  generateString() {
    let i = 0;
    let elArray = [];
    let element = this.stringData[this._generateStringAleatory()];
    for (let index = 0; index < this.numberData.length; index++) {
      while (i < 3) {
        let element = this.stringData[this._generateStringAleatory()];
        i++
        elArray.push(element)
      }
      for (let index = 0; index < elArray.length; index++) {
        this.valueAny = elArray.join("");
      }
    }

    return this.valueAny;
  }


  generateNumber() {
    let i = 0;
    let elArray = [];
    let element = this.numberData[this._generateNbrAleatory()];
    for (let index = 0; index < this.numberData.length; index++) {
      while (i < 3) {
        let element = this.numberData[this._generateNbrAleatory()];
        i++
        elArray.push(element)
      }
      for (let index = 0; index < elArray.length; index++) {
        this.valueAny = elArray.join("");
      }
    }
    return this.valueAny;
  }

  reinitiateResult() {
    this.generateForms.reset();
    this.generateForms.get('title').setValue(null)
    this.generate = null;
    this.watchValue = false;
  }

  saveObject() {
    this.generateService.saveObjectToSessionStorage(JSON.stringify(this.generate));
    this.dataInSession = true;


  }

  readObject() {
    this.generateForms.reset();
    this.generate = null;
    let obj: Generate = JSON.parse(this.generateService.getObjectToSessionStorage());

    this.generate = {
      title: obj.title,
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
        if (data !== null || undefined) {
          this.generate = null;
          this.generateForms.get('nbrLiner').enable();
          this.generateForms.get('nbrLiner').setValue(1);
          this.disabledButton = true;
        } else {
          this.generateForms.get('nbrLiner').disable()
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




}
