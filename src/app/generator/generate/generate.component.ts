import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import {GeneratorFormsService} from '../services/generator-forms.service';

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
  result: string[] = [];
  test;

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
  
  for (let index = 0; index < this.generateForms.getRawValue().generateFormArray.length; index++) {
    const element = this.generateForms.getRawValue().generateFormArray[index];
    
this.result.push(this.test)
    
    this.test = [
    { titleProperties: element.titleProperties}
    ]
    console.log(this.result)
}


}

}
