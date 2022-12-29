import { Sizes } from "./character-size.model";

export class Character {
  constructor() {

  };

  id!: number;
  characterName: string = "";
  level: number = 1;

  description: Description = new Description;
  abilities: Abilities = new Abilities;

  tempACMod: number = 0;
  totalHp: number = 0;
  currentHp: number = 0;

  languages: string[] = [];

  skills: Skills = new Skills;
}

export class Description {
  diety: string = "";
  homeland: string = "";
  race: string = "";
  size: Sizes = Sizes.medium;
  gender: string = "";
  age: number = 0;
  height: string = "";
  weight: string = "";
  hair: string = "";
  eyes: string = "";
}

export class Abilities {
  //Abilities
  strAbilityScore: number = 10;
  tempStrScore: number = 0;
  dexAbilityScore: number = 10;
  tempDexScore: number = 0;
  conAbilityScore: number = 10;
  tempConScore: number = 0;

  intAbilityScore: number = 10;
  tempIntScore: number = 0;
  wisAbilityScore: number = 10;
  tempWisScore: number = 0;
  chaAbilityScore: number = 10;
  tempChaScore: number = 0;
}

export class Skills {
  //skills
  acrobatics: number = 0;
  arcana: number = 0;
  athletics: number = 0;
  deception: number = 0;
  history: number = 0;
  insight: number = 0;
  intimidation: number = 0;
  investigation: number = 0;
  nature: number = 0;
  perception: number = 0;
  performance: number = 0;
  persuation: number = 0;
  religion: number = 0;
  stealth: number = 0;
  survival: number = 0;

  runecraft: number = 0;
  construction: number = 0;
  herblore: number = 0;
  thieving: number = 0;
  crafting: number = 0;
  fletching: number = 0;
  hunter: number = 0;
  mining: number = 0;
  smithing: number = 0;
  fishing: number = 0;
  cooking: number = 0;
  woodcutting: number = 0;
  farming: number = 0;
}
