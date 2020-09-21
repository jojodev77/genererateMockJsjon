import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorFormsService {

  constructor(private fb: FormBuilder) { }

  buildForm(): FormGroup {
    const generateFormArray = this.fb.array([
    ]);

    return this.fb.group({
      title: new FormControl(
        {
            value: '',
            disabled: false
        },
        {
            updateOn: 'change'
        }
    ),

    nbrLiner: new FormControl(
      {
          value: '',
          disabled: false
      },
      {
          updateOn: 'change'
      }
  ),

    generateFormArray: generateFormArray
    })
  }

  createGenerateForm(type?: string): FormGroup {
    const titleProperties = new FormControl(
        {
            value: '',
            disabled: false
        },
        {
            updateOn: 'change'
        }
    );

    const typeProperties = new FormControl(
      {
          value: '',
          disabled: false
      },
      {
          updateOn: 'change'
      }
  );

  const typeArrayProperties = new FormControl(
    {
        value: '',
        disabled: false
    },
    {
        updateOn: 'change'
    }
  );

    const result = new FormControl(
      {
          value: '',
          disabled: false
      },
      {
          updateOn: 'change'
      }
);
    return this.fb.group({
      titleProperties: titleProperties,
      typeProperties: typeProperties,
      typeArrayProperties: typeArrayProperties,
      result: result
    });
}

addGenerateForm(Form: FormGroup): void {
    (<FormArray>Form.get('generateFormArray')).push(this.createGenerateForm());
}
}
