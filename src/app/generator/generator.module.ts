import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { GenerateComponent } from './generate/generate.component';
import { ConfigComponent } from './config/config.component';

import { GeneratorFormsService } from './services/generator-forms.service';
import {GenerateService} from './services/generate.service';






@NgModule({
  declarations: [HeaderComponent, GenerateComponent, ConfigComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
  providers: [GeneratorFormsService, GenerateService]
})
export class GeneratorModule { }
