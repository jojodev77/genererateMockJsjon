import { Component, OnInit } from '@angular/core';

import { Generate } from '../generate/model/generate.model';

import { GenerateService } from '../services/generate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private generateService: GenerateService) { }

  generate: Generate

  ngOnInit(): void {
  }



}
