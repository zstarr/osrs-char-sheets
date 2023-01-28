import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbilitiesComponent } from './abilities/abilities.component';
import { GeneralComponent } from './general/general.component';
import { SkillsComponent } from './skills/skills.component';
import { DefenseComponent } from './defense/defense.component';
import { SpellsComponent } from './spells/spells.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CharacterSheetComponent } from './character-sheet.component';
import { CharacterDeleteDialog } from './nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../core/angular-material/angular-material.module';
import { SavesComponent } from './saves/saves.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CharacterSheetComponent,
    CharacterDeleteDialog,
    AbilitiesComponent,
    GeneralComponent,
    SkillsComponent,
    SavesComponent,
    DefenseComponent,
    SpellsComponent,
    NotesComponent,
    NavBarComponent
  ]
})
export class CharacterSheetModule { }
