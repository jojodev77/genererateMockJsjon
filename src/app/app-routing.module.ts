
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GenerateComponent} from './generator/generate/generate.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Generate_page',
    pathMatch: 'full'
},

{
    path: 'Generate_page',
    component: GenerateComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
