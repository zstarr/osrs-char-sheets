import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'char-sheet-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['../character-sheet.component.scss']
})
export class NotesComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
