import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CharacterService } from '../core/services/character.service';
import {
  distinctUntilChanged,
  pairwise,
  tap,
  throttleTime,
} from 'rxjs/operators';

import { asyncScheduler, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent implements OnInit, OnDestroy {

  character: Observable<any>;
  charSheetChangeSub!: Subscription;
  charForm!: FormGroup;

  constructor(
    public characterService: CharacterService,
    private fb: FormBuilder,
  ) {
    this.initForm();
    this.character = this.characterService.character.pipe(
      tap((char) => {
        this.initForm();
        this.onChanges();
        if (char) this.charForm.patchValue(char);
      })
    );
  }

  ngOnDestroy(): void {
    if (this.charSheetChangeSub) this.charSheetChangeSub.unsubscribe();
  }

  ngOnInit(): void {}

  initForm() {

    this.charForm = this.fb.group({
      id: [''],
      //general
      characterName: [''],
      alignment: [''],
      level: [1],
      class: [''],
      hitDice: [0],
      diety: [''],
      homeland: [''],
      race: [''],
      size: [''],
      gender: [''],
      age: [''],
      height: [''],
      weight: [''],
      hair: [''],
      eyes: [''],
      speed: [''],
      init: [''],
      languages: [''],
      abilities: this.fb.group({
        strAbilityScore: [''],
        tempStrScore: [''],
        dexAbilityScore: [''],
        tempDexScore: [''],
        conAbilityScore: [''],
        tempConScore:[''],
        intAbilityScore: [''],
        tempIntScore: [''],
        wisAbilityScore: [''],
        tempWisScore: [''],
        chaAbilityScore: [''],
        tempChaScore: [''],
      }),
      skills: this.fb.group({
        acrobatics: this.getSkillGroup(),
        arcana: this.getSkillGroup(),
        athletics: this.getSkillGroup(),
        deception: this.getSkillGroup(),
        history: this.getSkillGroup(),
        insight: this.getSkillGroup(),
        intimidation: this.getSkillGroup(),
        investigation: this.getSkillGroup(),
        nature: this.getSkillGroup(),
        perception: this.getSkillGroup(),
        performance: this.getSkillGroup(),
        persuasion: this.getSkillGroup(),
        religion: this.getSkillGroup(),
        stealth: this.getSkillGroup(),
        survival: this.getSkillGroup(),
        runecraft: this.getSkillGroup(),
        construction: this.getSkillGroup(),
        herblore: this.getSkillGroup(),
        thieving: this.getSkillGroup(),
        crafting: this.getSkillGroup(),
        fletching: this.getSkillGroup(),
        hunter: this.getSkillGroup(),
        mining: this.getSkillGroup(),
        smithing: this.getSkillGroup(),
        fishing: this.getSkillGroup(),
        cooking: this.getSkillGroup(),
        woodcutting: this.getSkillGroup(),
        farming: this.getSkillGroup()
      }),
      offense: [''],
      //defense
      tempACMod: [''],
      totalHp: [''],
      currentHp: [''],
      saves: this.fb.group({
        strength: this.getSaveGroup(),
        dexterity: this.getSaveGroup(),
        constitution: this.getSaveGroup(),
        intelligence: this.getSaveGroup(),
        wisdom: this.getSaveGroup(),
        charisma: this.getSaveGroup(),
      }),
      spells: this.fb.group({
        abilityMod: [''],
        saveDC: [''],
        attackBonus: [''],
        notes: ['']
      }),
      notes: ['']
    });

  }

  getSkillGroup() {
    return this.fb.group({
      proficient: [''],
      mod: [''],
      abilityMod: ['']
    });
  }

  getSaveGroup() {
    return this.fb.group({
      proficient: [''],
    });
  }

  onChanges() {

    this.charSheetChangeSub = this.charForm.valueChanges
      .pipe(
        throttleTime(500, asyncScheduler, {leading: true, trailing: true}),
        distinctUntilChanged(),
        pairwise()
      )
      .subscribe(([prevVal, nextVal]: [any, any]) => {
        this.characterService.saveCharacter(nextVal);
      });
  }

}
