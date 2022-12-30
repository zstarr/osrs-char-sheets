import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharacterService } from 'src/app/core/services/character.service';

@Component({
  selector: 'char-sheet-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['../character-sheet.component.scss']
})
export class SkillsComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  constructor(public characterService: CharacterService) { }

  ngOnInit(): void {
  }


}
