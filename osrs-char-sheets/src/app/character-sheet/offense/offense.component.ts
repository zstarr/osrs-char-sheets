import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'char-sheet-offense',
  templateUrl: './offense.component.html',
  styleUrls: ['../character-sheet.component.scss']
})
export class OffenseComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
