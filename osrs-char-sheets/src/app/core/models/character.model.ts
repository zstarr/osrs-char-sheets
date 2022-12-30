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
  acrobatics: Skill = { proficient: false, abilityMod: AbilitiesEnum.Dex, mod: 0 };
  arcana: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  athletics: Skill = { proficient: false, abilityMod: AbilitiesEnum.Str, mod: 0 };
  deception: Skill = { proficient: false, abilityMod: AbilitiesEnum.Cha, mod: 0 };
  history: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  insight: Skill = { proficient: false, abilityMod: AbilitiesEnum.Wis, mod: 0 };
  intimidation: Skill = { proficient: false, abilityMod: AbilitiesEnum.Cha, mod: 0 };
  investigation: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  nature: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  perception: Skill = { proficient: false, abilityMod: AbilitiesEnum.Wis, mod: 0 };
  performance: Skill = { proficient: false, abilityMod: AbilitiesEnum.Cha, mod: 0 };
  persuation: Skill = { proficient: false, abilityMod: AbilitiesEnum.Cha, mod: 0 };
  religion: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  stealth: Skill = { proficient: false, abilityMod: AbilitiesEnum.Dex, mod: 0 };
  survival: Skill = { proficient: false, abilityMod: AbilitiesEnum.Wis, mod: 0 };

  runecraft: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  construction: Skill = { proficient: false, abilityMod: AbilitiesEnum.Str, mod: 0 };
  herblore: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  thieving: Skill = { proficient: false, abilityMod: AbilitiesEnum.Dex, mod: 0 };
  crafting: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  fletching: Skill = { proficient: false, abilityMod: AbilitiesEnum.Dex, mod: 0 };
  hunter: Skill = { proficient: false, abilityMod: AbilitiesEnum.Dex, mod: 0 };
  mining: Skill = { proficient: false, abilityMod: AbilitiesEnum.Str, mod: 0 };
  smithing: Skill = { proficient: false, abilityMod: AbilitiesEnum.Str, mod: 0 };
  fishing: Skill = { proficient: false, abilityMod: AbilitiesEnum.Wis, mod: 0 };
  cooking: Skill = { proficient: false, abilityMod: AbilitiesEnum.Int, mod: 0 };
  woodcutting: Skill = { proficient: false, abilityMod: AbilitiesEnum.Str, mod: 0 };
  farming: Skill = { proficient: false, abilityMod: AbilitiesEnum.Wis, mod: 0 };
}

export class Skill {
  proficient: boolean = false;
  abilityMod!: AbilitiesEnum;
  mod: number = 0;
}

export enum AbilitiesEnum {
  Str,
  Dex,
  Con,
  Wis,
  Int,
  Cha
}
