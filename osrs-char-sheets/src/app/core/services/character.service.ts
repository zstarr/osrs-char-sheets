import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AbilitiesEnum, Character } from '../models/character.model';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { pairwise, tap } from 'rxjs/operators';
import { CharacterSizes } from "../models/character-size.model";

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private characterDbString!: string;
  database: AngularFireDatabase;
  user!: firebase.User;

  allCharacters: BehaviorSubject<Character[] | null> = new BehaviorSubject<Character[] | null>(null);
  public character = new BehaviorSubject<Character | null>(null);
  lastViewedCharId!: number;

  loadedCharacterSub!: Subscription;
  lastViewedSub!: Subscription;
  updateCharsSub!: Subscription;

  characterSizes = CharacterSizes;

  strMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  dexMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  conMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  intMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  wisMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  chaMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  profMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  acrobaticsMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  arcanaMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  athleticsMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  deceptionMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  historyMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  insightMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  intimidationMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  investigationMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  natureMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  perceptionMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  performanceMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  persuasionMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  religionMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  stealthMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  survivalMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  runecraftMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructionMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  herbloreMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  thievingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  craftingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  fletchingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  hunterMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  miningMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  smithingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  fishingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cookingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  woodcuttingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  farmingMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  AC: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  armorMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  sizeMod: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  lolCount: number = 0;

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
    this.database = db;
    this.afAuth.authState.subscribe(user => {
      if (user?.uid) {
        this.characterDbString = 'users/' + user.uid + '/osrs-char-sheets';
        this.updateCharacters();
        this.lastViewedSub = this.getLastViewedCharacter();
      }
    });

    this.character.pipe(pairwise(), tap(
      ([prevVal, nextVal]: [Character | null, Character | null]) => {
        this.profMod.next(this.getProfMod(nextVal!));
        this.updateAbilityScores(nextVal!);
        this.updateSkills(nextVal!);
        this.sizeMod.next(
          CharacterSizes.find(charSize => charSize.creatureSize == nextVal?.description.size)?.mod ?? 0
        );
        this.AC.next(10 + this.dexMod.value + nextVal!.tempACMod + this.armorMod.value + this.sizeMod.value);
      }
    )).subscribe();
  }

  updateAbilityScores(char: Character) {
    this.strMod.next(Math.floor((char.abilities.strAbilityScore + char.abilities.tempStrScore - 10) / 2));
    this.dexMod.next(Math.floor((char.abilities.dexAbilityScore + char.abilities.tempDexScore - 10) / 2));
    this.conMod.next(Math.floor((char.abilities.conAbilityScore + char.abilities.tempConScore - 10) / 2));
    this.intMod.next(Math.floor((char.abilities.intAbilityScore + char.abilities.tempIntScore - 10) / 2));
    this.wisMod.next(Math.floor((char.abilities.wisAbilityScore + char.abilities.tempWisScore - 10) / 2));
    this.chaMod.next(Math.floor((char.abilities.chaAbilityScore + char.abilities.tempChaScore - 10) / 2));
  }

  updateSkills(char: Character) {
    this.acrobaticsMod.next(
      char.skills.acrobatics.mod +
      this.getAbilityModFromEnum(char.skills.acrobatics.abilityMod).value +
      (char.skills.acrobatics.proficient ? this.profMod.value : 0)
    );

    this.arcanaMod.next(
      char.skills.arcana.mod +
      this.getAbilityModFromEnum(char.skills.arcana.abilityMod).value +
      (char.skills.arcana.proficient ? this.profMod.value : 0)
    );

    this.athleticsMod.next(
      char.skills.athletics.mod +
      this.getAbilityModFromEnum(char.skills.athletics.abilityMod).value +
      (char.skills.athletics.proficient ? this.profMod.value : 0)
    );

    this.deceptionMod.next(
      char.skills.deception.mod +
      this.getAbilityModFromEnum(char.skills.deception.abilityMod).value +
      (char.skills.deception.proficient ? this.profMod.value : 0)
    );

    this.historyMod.next(
      char.skills.history.mod +
      this.getAbilityModFromEnum(char.skills.history.abilityMod).value +
      (char.skills.history.proficient ? this.profMod.value : 0)
    );

    this.insightMod.next(
      char.skills.insight.mod +
      this.getAbilityModFromEnum(char.skills.insight.abilityMod).value +
      (char.skills.insight.proficient ? this.profMod.value : 0)
    );

    this.intimidationMod.next(
      char.skills.intimidation.mod +
      this.getAbilityModFromEnum(char.skills.intimidation.abilityMod).value +
      (char.skills.intimidation.proficient ? this.profMod.value : 0)
    );

    this.investigationMod.next(
      char.skills.investigation.mod +
      this.getAbilityModFromEnum(char.skills.investigation.abilityMod).value +
      (char.skills.investigation.proficient ? this.profMod.value : 0)
    );

    this.natureMod.next(
      char.skills.nature.mod +
      this.getAbilityModFromEnum(char.skills.nature.abilityMod).value +
      (char.skills.nature.proficient ? this.profMod.value : 0)
    );

    this.perceptionMod.next(
      char.skills.perception.mod +
      this.getAbilityModFromEnum(char.skills.perception.abilityMod).value +
      (char.skills.perception.proficient ? this.profMod.value : 0)
    );

    this.performanceMod.next(
      char.skills.performance.mod +
      this.getAbilityModFromEnum(char.skills.performance.abilityMod).value +
      (char.skills.performance.proficient ? this.profMod.value : 0)
    );

    this.persuasionMod.next(
      char.skills.persuasion.mod +
      this.getAbilityModFromEnum(char.skills.persuasion.abilityMod).value +
      (char.skills.persuasion.proficient ? this.profMod.value : 0)
    );

    this.religionMod.next(
      char.skills.religion.mod +
      this.getAbilityModFromEnum(char.skills.religion.abilityMod).value +
      (char.skills.religion.proficient ? this.profMod.value : 0)
    );

    this.stealthMod.next(
      char.skills.stealth.mod +
      this.getAbilityModFromEnum(char.skills.stealth.abilityMod).value +
      (char.skills.stealth.proficient ? this.profMod.value : 0)
    );

    this.survivalMod.next(
      char.skills.survival.mod +
      this.getAbilityModFromEnum(char.skills.survival.abilityMod).value +
      (char.skills.survival.proficient ? this.profMod.value : 0)
    );

    this.runecraftMod.next(
      char.skills.runecraft.mod +
      this.getAbilityModFromEnum(char.skills.runecraft.abilityMod).value +
      (char.skills.runecraft.proficient ? this.profMod.value : 0)
    );

    this.constructionMod.next(
      char.skills.construction.mod +
      this.getAbilityModFromEnum(char.skills.construction.abilityMod).value +
      (char.skills.construction.proficient ? this.profMod.value : 0)
    );

    this.herbloreMod.next(
      char.skills.herblore.mod +
      this.getAbilityModFromEnum(char.skills.herblore.abilityMod).value +
      (char.skills.herblore.proficient ? this.profMod.value : 0)
    );

    this.thievingMod.next(
      char.skills.thieving.mod +
      this.getAbilityModFromEnum(char.skills.thieving.abilityMod).value +
      (char.skills.thieving.proficient ? this.profMod.value : 0)
    );

    this.craftingMod.next(
      char.skills.crafting.mod +
      this.getAbilityModFromEnum(char.skills.crafting.abilityMod).value +
      (char.skills.crafting.proficient ? this.profMod.value : 0)
    );

    this.fletchingMod.next(
      char.skills.fletching.mod +
      this.getAbilityModFromEnum(char.skills.fletching.abilityMod).value +
      (char.skills.fletching.proficient ? this.profMod.value : 0)
    );

    this.hunterMod.next(
      char.skills.hunter.mod +
      this.getAbilityModFromEnum(char.skills.hunter.abilityMod).value +
      (char.skills.hunter.proficient ? this.profMod.value : 0)
    );

    this.miningMod.next(
      char.skills.mining.mod +
      this.getAbilityModFromEnum(char.skills.mining.abilityMod).value +
      (char.skills.mining.proficient ? this.profMod.value : 0)
    );

    this.smithingMod.next(
      char.skills.smithing.mod +
      this.getAbilityModFromEnum(char.skills.smithing.abilityMod).value +
      (char.skills.smithing.proficient ? this.profMod.value : 0)
    );

    this.fishingMod.next(
      char.skills.fishing.mod +
      this.getAbilityModFromEnum(char.skills.fishing.abilityMod).value +
      (char.skills.fishing.proficient ? this.profMod.value : 0)
    );

    this.cookingMod.next(
      char.skills.cooking.mod +
      this.getAbilityModFromEnum(char.skills.cooking.abilityMod).value +
      (char.skills.cooking.proficient ? this.profMod.value : 0)
    );

    this.woodcuttingMod.next(
      char.skills.woodcutting.mod +
      this.getAbilityModFromEnum(char.skills.woodcutting.abilityMod).value +
      (char.skills.woodcutting.proficient ? this.profMod.value : 0)
    );

    this.farmingMod.next(
      char.skills.farming.mod +
      this.getAbilityModFromEnum(char.skills.farming.abilityMod).value +
      (char.skills.farming.proficient ? this.profMod.value : 0)
    );
  }

  loadCharacter(id: number) {
    if (this.loadedCharacterSub) this.loadedCharacterSub.unsubscribe();

    this.loadedCharacterSub = this.db.object(this.characterDbString + '/characters/' + id).valueChanges().subscribe(char => {
      if(char) {
        this.character.next(char as Character);
        this.updateLastViewedCharacterById(id);
      }
    });
  }

  newCharacter() {
    var id = this.allCharacters.value?.length;
    if (!id) {
      id = 0;
    }
    let newChar = new Character();
    newChar.id = id;
    newChar.characterName = "New Character";
    var charTable = this.database.object(this.characterDbString + '/characters/' + id);
    charTable.set(newChar);
  }

  updateCharacters() {
    this.updateCharsSub = this.database
      .list<Character>(this.characterDbString + '/characters')
      .valueChanges()
      .subscribe((chars) => {
        this.allCharacters.next(chars);
        if(chars.length == 0) this.router.navigate(['characters'])
      });
  }

  saveCharacter(character: Character) {
    var charTable = this.database.object(
      this.characterDbString + '/characters/' + character.id
    );
    charTable
      .update(character)
      //.then(() => )
      .catch((error) => console.log('error saving char: ', error));
  }

  deleteActiveCharacter() {
    this.database.object(this.characterDbString + '/characters/' + this.character.value?.id).remove();
  }

  getLastViewedCharacter(): Subscription {
    return this.database
      .object(this.characterDbString + '/lastViewedCharacter').valueChanges().subscribe(charId => {
        if (!charId) this.updateLastViewedCharacterById(0);
        this.lastViewedCharId = Number(charId);
        this.loadCharacter(this.lastViewedCharId);
      });
  }

  updateLastViewedCharacterById(id: number) {
    this.database
    .object(this.characterDbString + '/lastViewedCharacter').set(id);
  }

  logout() {
    if (this.lastViewedSub) this.lastViewedSub.unsubscribe();
    if (this.loadedCharacterSub) this.loadedCharacterSub.unsubscribe();
    if (this.updateCharsSub) this.updateCharsSub.unsubscribe();
  }

  getAbilityModFromEnum(e: AbilitiesEnum): BehaviorSubject<number> {
    console.log(this.lolCount++)
    switch(e) {
      case AbilitiesEnum.Cha:
        return this.chaMod;
      case AbilitiesEnum.Con:
        return this.conMod;
      case AbilitiesEnum.Dex:
        return this.dexMod;
      case AbilitiesEnum.Int:
        return this.intMod;
      case AbilitiesEnum.Str:
        return this.strMod;
      case AbilitiesEnum.Wis:
        return this.wisMod;
    }
  }

  calcSkillMod() {
    return 3;
  }

  getProfMod(character: Character) {
    return Math.ceil(character.level / 4) + 1;
  }

}
