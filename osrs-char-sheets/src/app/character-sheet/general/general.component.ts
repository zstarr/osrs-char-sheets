import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharacterService } from 'src/app/core/services/character.service';
import { CharacterSize, CharacterSizes } from "../../core/models/character-size.model";

@Component({
  selector: 'char-sheet-general',
  templateUrl: './general.component.html',
  styleUrls: ['../character-sheet.component.scss']
})
export class GeneralComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  characterSizes: CharacterSize[] = CharacterSizes;

  constructor(public characterService: CharacterService) { }

  ngOnInit(): void {
  }

  compareSize = function(option: { creatureSize: any; }, value: { creatureSize: any; }) {
    return option?.creatureSize === value?.creatureSize;
  }

}
