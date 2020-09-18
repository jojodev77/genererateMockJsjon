import { TestBed } from '@angular/core/testing';

import { GeneratorFormsService } from './generator-forms.service';

describe('GeneratorFormsService', () => {
  let service: GeneratorFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
