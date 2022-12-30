import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'char-sheet-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['../character-sheet.component.scss']
})
export class SkillsComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }


}
