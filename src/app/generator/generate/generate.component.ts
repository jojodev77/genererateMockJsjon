import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import {GeneratorFormsService} from '../services/generator-forms.service';

import {Generate} from './model/generate.model';

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

  valueString: string;

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
}

generateString() {
  this.valueString = 'Hello';
  return this.valueString;
}

generateNumber() {
  return 123
}

}
