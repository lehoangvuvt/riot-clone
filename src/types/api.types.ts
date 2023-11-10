type ChampStat = {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
};

type RiotImage = {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type ChampInfo = {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
};

type ChampSkin = {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
};

export type ChampSpell = {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: {
    label: string[];
    effect: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: any;
  effect: any[];
  effectBurn: string[];
  vars: any[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: RiotImage;
  resource: string;
};

type ChampPassive = {
  name: string;
  description: string;
  image: RiotImage;
};

export type ChampItem = {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampInfo;
  image: RiotImage;
  stats: ChampStat;
  tags: string[];
  partype: string;
};

export interface ChampDetails extends ChampItem {
  skins: ChampSkin[];
  spells: ChampSpell[];
  passive: ChampSpell;
  recommended: any[];
}

export type GetChampDetailsResponse = {
  type: string;
  format: string;
  version: string;
  data: {
    [champId: string]: ChampDetails;
  };
};

type UniverseChampionImageType = {
  title: string;
  subtitle: string;
  description: string;
  uri: string;
  encoding: string;
  width: number;
  height: number;
  x: number;
  y: number;
  "featured-champions": any[];
};

type UniverseChampionType = {
  type: string;
  "release-date": string;
  name: string;
  title: string;
  "section-title": string;
  slug: string;
  "associated-faction": string;
  "associated-faction-slug": string;
  image: UniverseChampionImageType;
  background: UniverseChampionImageType;
  url: string;
};

type UniverseFactionType = {
  type: string;
  title: string;
  "section-title": string;
  name: string;
  slug: string;
  description: string;
  image: UniverseChampionImageType;
  background: UniverseChampionImageType;
  url: string;
  echelon: string;
  "associated-champions": any[];
};

export type UniverseIndexDataType = {
  champions: Array<UniverseChampionType>;
  factions: Array<UniverseFactionType>;
};

export type HeroModuleType = {
  type: "link-out" | "story-preview";
  description: string;
  "release-date": string;
  name: string;
  title: string;
  "section-title": string;
  slug: string;
  "associated-faction": string;
  "associated-faction-slug": string;
  image: UniverseChampionImageType;
  "featured-image": UniverseChampionImageType;
  background: UniverseChampionImageType;
  url: string;
  video: string | null;
  races: any[];
  roles: any[];
  role: any[];
  "game-info-url": string;
  biography: {
    full: string;
    quote: string;
    "quote-author": string;
  };
  bioImage: UniverseChampionImageType;
  headerImage: string | null;
  subtitle: string;
  echelon: number;
  "link-out-type": string;
};

export type UniverseExploreDataType = {
  id: string;
  name: string;
  locale: string;
  "section-order": string[];
  "hero-modules": Array<HeroModuleType>;
};
