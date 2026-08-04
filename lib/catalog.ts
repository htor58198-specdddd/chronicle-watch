export type Universe = "mcu" | "xmen" | "f4";
export type ContentType = "film" | "season" | "special" | "short";

export interface CatalogItem {
  id: string;
  title: string;
  type: ContentType;
  lane: string;
  story: string;
  releaseYear: number;
  totalUnits: number;
  availableUnits: number;
  code: string;
  universes: Universe[];
  orderByUniverse: Partial<Record<Universe, number>>;
}

export const universeNames: Record<Universe, string> = {
  mcu: "MCU",
  xmen: "X-Men",
  f4: "Fantastic Four",
};

export const catalog: CatalogItem[] = [
  {
    id: "eyes-wakanda-s1",
    title: "Eyes of Wakanda · Sezon 1",
    type: "season",
    lane: "animation",
    story: "MÖ 1260–1896",
    releaseYear: 2025,
    totalUnits: 4,
    availableUnits: 4,
    code: "EW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 1
    }
  },
  {
    id: "captain-first-avenger",
    title: "Captain America: The First Avenger",
    type: "film",
    lane: "core",
    story: "1943–45",
    releaseYear: 2011,
    totalUnits: 1,
    availableUnits: 1,
    code: "CA",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 2
    }
  },
  {
    id: "agent-carter-one-shot",
    title: "Agent Carter",
    type: "short",
    lane: "short",
    story: "1946",
    releaseYear: 2013,
    totalUnits: 1,
    availableUnits: 1,
    code: "AC",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 3
    }
  },
  {
    id: "agent-carter-s1",
    title: "Agent Carter · Sezon 1",
    type: "season",
    lane: "legacy",
    story: "1946",
    releaseYear: 2015,
    totalUnits: 8,
    availableUnits: 8,
    code: "AC1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 4
    }
  },
  {
    id: "agent-carter-s2",
    title: "Agent Carter · Sezon 2",
    type: "season",
    lane: "legacy",
    story: "1947",
    releaseYear: 2016,
    totalUnits: 10,
    availableUnits: 10,
    code: "AC2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 5
    }
  },
  {
    id: "fantastic-four-first-steps",
    title: "The Fantastic Four: First Steps",
    type: "film",
    lane: "multiverse",
    story: "1964 · Earth-828",
    releaseYear: 2025,
    totalUnits: 1,
    availableUnits: 1,
    code: "F4",
    universes: [
      "mcu",
      "f4"
    ],
    orderByUniverse: {
      mcu: 6,
      f4: 4
    }
  },
  {
    id: "captain-marvel",
    title: "Captain Marvel",
    type: "film",
    lane: "core",
    story: "1995",
    releaseYear: 2019,
    totalUnits: 1,
    availableUnits: 1,
    code: "CM",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 7
    }
  },
  {
    id: "iron-man",
    title: "Iron Man",
    type: "film",
    lane: "core",
    story: "2008",
    releaseYear: 2008,
    totalUnits: 1,
    availableUnits: 1,
    code: "IM",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 8
    }
  },
  {
    id: "iron-man-2",
    title: "Iron Man 2",
    type: "film",
    lane: "core",
    story: "2010",
    releaseYear: 2010,
    totalUnits: 1,
    availableUnits: 1,
    code: "IM2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 9
    }
  },
  {
    id: "funny-thing-thor-hammer",
    title: "A Funny Thing Happened on the Way to Thor’s Hammer",
    type: "short",
    lane: "short",
    story: "2010",
    releaseYear: 2011,
    totalUnits: 1,
    availableUnits: 1,
    code: "FT",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 10
    }
  },
  {
    id: "incredible-hulk",
    title: "The Incredible Hulk",
    type: "film",
    lane: "core",
    story: "2010",
    releaseYear: 2008,
    totalUnits: 1,
    availableUnits: 1,
    code: "H",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 11
    }
  },
  {
    id: "thor",
    title: "Thor",
    type: "film",
    lane: "core",
    story: "2010",
    releaseYear: 2011,
    totalUnits: 1,
    availableUnits: 1,
    code: "T",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 12
    }
  },
  {
    id: "the-consultant",
    title: "The Consultant",
    type: "short",
    lane: "short",
    story: "2011",
    releaseYear: 2011,
    totalUnits: 1,
    availableUnits: 1,
    code: "TC",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 13
    }
  },
  {
    id: "avengers",
    title: "The Avengers",
    type: "film",
    lane: "core",
    story: "2012",
    releaseYear: 2012,
    totalUnits: 1,
    availableUnits: 1,
    code: "A",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 14
    }
  },
  {
    id: "item-47",
    title: "Item 47",
    type: "short",
    lane: "short",
    story: "2012",
    releaseYear: 2012,
    totalUnits: 1,
    availableUnits: 1,
    code: "47",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 15
    }
  },
  {
    id: "aos-s1",
    title: "Agents of S.H.I.E.L.D. · Sezon 1",
    type: "season",
    lane: "legacy",
    story: "2013–14 · paralel",
    releaseYear: 2013,
    totalUnits: 22,
    availableUnits: 22,
    code: "S1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 16
    }
  },
  {
    id: "thor-dark-world",
    title: "Thor: The Dark World",
    type: "film",
    lane: "core",
    story: "2013",
    releaseYear: 2013,
    totalUnits: 1,
    availableUnits: 1,
    code: "TDW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 17
    }
  },
  {
    id: "iron-man-3",
    title: "Iron Man 3",
    type: "film",
    lane: "core",
    story: "2013–14",
    releaseYear: 2013,
    totalUnits: 1,
    availableUnits: 1,
    code: "IM3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 18
    }
  },
  {
    id: "all-hail-the-king",
    title: "All Hail the King",
    type: "short",
    lane: "short",
    story: "2013",
    releaseYear: 2014,
    totalUnits: 1,
    availableUnits: 1,
    code: "AH",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 19
    }
  },
  {
    id: "winter-soldier",
    title: "Captain America: The Winter Soldier",
    type: "film",
    lane: "core",
    story: "2014",
    releaseYear: 2014,
    totalUnits: 1,
    availableUnits: 1,
    code: "WS",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 20
    }
  },
  {
    id: "aos-s2",
    title: "Agents of S.H.I.E.L.D. · Sezon 2",
    type: "season",
    lane: "legacy",
    story: "2014–15 · paralel",
    releaseYear: 2014,
    totalUnits: 22,
    availableUnits: 22,
    code: "S2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 21
    }
  },
  {
    id: "guardians",
    title: "Guardians of the Galaxy",
    type: "film",
    lane: "core",
    story: "2014",
    releaseYear: 2014,
    totalUnits: 1,
    availableUnits: 1,
    code: "G",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 22
    }
  },
  {
    id: "guardians-2",
    title: "Guardians of the Galaxy Vol. 2",
    type: "film",
    lane: "core",
    story: "2014",
    releaseYear: 2017,
    totalUnits: 1,
    availableUnits: 1,
    code: "G2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 23
    }
  },
  {
    id: "i-am-groot-s1",
    title: "I Am Groot · Sezon 1",
    type: "season",
    lane: "animation",
    story: "2014",
    releaseYear: 2022,
    totalUnits: 5,
    availableUnits: 5,
    code: "IG1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 24
    }
  },
  {
    id: "i-am-groot-s2",
    title: "I Am Groot · Sezon 2",
    type: "season",
    lane: "animation",
    story: "2014",
    releaseYear: 2023,
    totalUnits: 5,
    availableUnits: 5,
    code: "IG2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 25
    }
  },
  {
    id: "daredevil-s1",
    title: "Daredevil · Sezon 1",
    type: "season",
    lane: "defenders",
    story: "2014",
    releaseYear: 2015,
    totalUnits: 13,
    availableUnits: 13,
    code: "DD1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 26
    }
  },
  {
    id: "jessica-jones-s1",
    title: "Jessica Jones · Sezon 1",
    type: "season",
    lane: "defenders",
    story: "2015",
    releaseYear: 2015,
    totalUnits: 13,
    availableUnits: 13,
    code: "JJ1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 27
    }
  },
  {
    id: "age-of-ultron",
    title: "Avengers: Age of Ultron",
    type: "film",
    lane: "core",
    story: "2015",
    releaseYear: 2015,
    totalUnits: 1,
    availableUnits: 1,
    code: "AU",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 28
    }
  },
  {
    id: "whih-s1",
    title: "WHIH Newsfront · Sezon 1",
    type: "season",
    lane: "short",
    story: "2015",
    releaseYear: 2015,
    totalUnits: 5,
    availableUnits: 5,
    code: "WH1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 29
    }
  },
  {
    id: "ant-man",
    title: "Ant-Man",
    type: "film",
    lane: "core",
    story: "2015",
    releaseYear: 2015,
    totalUnits: 1,
    availableUnits: 1,
    code: "AM",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 30
    }
  },
  {
    id: "aos-s3",
    title: "Agents of S.H.I.E.L.D. · Sezon 3",
    type: "season",
    lane: "legacy",
    story: "2015–16 · paralel",
    releaseYear: 2015,
    totalUnits: 22,
    availableUnits: 22,
    code: "S3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 31
    }
  },
  {
    id: "daredevil-s2",
    title: "Daredevil · Sezon 2",
    type: "season",
    lane: "defenders",
    story: "2015",
    releaseYear: 2016,
    totalUnits: 13,
    availableUnits: 13,
    code: "DD2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 32
    }
  },
  {
    id: "luke-cage-s1",
    title: "Luke Cage · Sezon 1",
    type: "season",
    lane: "defenders",
    story: "2015",
    releaseYear: 2016,
    totalUnits: 13,
    availableUnits: 13,
    code: "LC1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 33
    }
  },
  {
    id: "iron-fist-s1",
    title: "Iron Fist · Sezon 1",
    type: "season",
    lane: "defenders",
    story: "2016",
    releaseYear: 2017,
    totalUnits: 13,
    availableUnits: 13,
    code: "IF1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 34
    }
  },
  {
    id: "defenders-s1",
    title: "The Defenders · Sezon 1",
    type: "season",
    lane: "defenders",
    story: "2016",
    releaseYear: 2017,
    totalUnits: 8,
    availableUnits: 8,
    code: "DEF",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 35
    }
  },
  {
    id: "civil-war",
    title: "Captain America: Civil War",
    type: "film",
    lane: "core",
    story: "2016",
    releaseYear: 2016,
    totalUnits: 1,
    availableUnits: 1,
    code: "CW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 36
    }
  },
  {
    id: "black-widow",
    title: "Black Widow",
    type: "film",
    lane: "core",
    story: "2016",
    releaseYear: 2021,
    totalUnits: 1,
    availableUnits: 1,
    code: "BW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 37
    }
  },
  {
    id: "black-panther",
    title: "Black Panther",
    type: "film",
    lane: "core",
    story: "2016",
    releaseYear: 2018,
    totalUnits: 1,
    availableUnits: 1,
    code: "BP",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 38
    }
  },
  {
    id: "homecoming",
    title: "Spider-Man: Homecoming",
    type: "film",
    lane: "core",
    story: "2016",
    releaseYear: 2017,
    totalUnits: 1,
    availableUnits: 1,
    code: "SM",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 39
    }
  },
  {
    id: "team-thor",
    title: "Team Thor",
    type: "short",
    lane: "short",
    story: "2016 · alternatif kısa",
    releaseYear: 2016,
    totalUnits: 1,
    availableUnits: 1,
    code: "TT",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 40
    }
  },
  {
    id: "team-thor-2",
    title: "Team Thor: Part 2",
    type: "short",
    lane: "short",
    story: "2016 · alternatif kısa",
    releaseYear: 2017,
    totalUnits: 1,
    availableUnits: 1,
    code: "TT2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 41
    }
  },
  {
    id: "punisher-s1",
    title: "The Punisher · Sezon 1",
    type: "season",
    lane: "defenders",
    story: "2016",
    releaseYear: 2017,
    totalUnits: 13,
    availableUnits: 13,
    code: "P1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 42
    }
  },
  {
    id: "doctor-strange",
    title: "Doctor Strange",
    type: "film",
    lane: "core",
    story: "2016–17",
    releaseYear: 2016,
    totalUnits: 1,
    availableUnits: 1,
    code: "DS",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 43
    }
  },
  {
    id: "aos-slingshot",
    title: "Agents of S.H.I.E.L.D.: Slingshot",
    type: "season",
    lane: "legacy",
    story: "2016",
    releaseYear: 2016,
    totalUnits: 6,
    availableUnits: 6,
    code: "SL",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 44
    }
  },
  {
    id: "aos-s4",
    title: "Agents of S.H.I.E.L.D. · Sezon 4",
    type: "season",
    lane: "legacy",
    story: "2016–17 · paralel",
    releaseYear: 2016,
    totalUnits: 22,
    availableUnits: 22,
    code: "S4",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 45
    }
  },
  {
    id: "jessica-jones-s2",
    title: "Jessica Jones · Sezon 2",
    type: "season",
    lane: "defenders",
    story: "2017",
    releaseYear: 2018,
    totalUnits: 13,
    availableUnits: 13,
    code: "JJ2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 46
    }
  },
  {
    id: "luke-cage-s2",
    title: "Luke Cage · Sezon 2",
    type: "season",
    lane: "defenders",
    story: "2017",
    releaseYear: 2018,
    totalUnits: 13,
    availableUnits: 13,
    code: "LC2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 47
    }
  },
  {
    id: "iron-fist-s2",
    title: "Iron Fist · Sezon 2",
    type: "season",
    lane: "defenders",
    story: "2017",
    releaseYear: 2018,
    totalUnits: 10,
    availableUnits: 10,
    code: "IF2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 48
    }
  },
  {
    id: "daredevil-s3",
    title: "Daredevil · Sezon 3",
    type: "season",
    lane: "defenders",
    story: "2017",
    releaseYear: 2018,
    totalUnits: 13,
    availableUnits: 13,
    code: "DD3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 49
    }
  },
  {
    id: "aos-s5",
    title: "Agents of S.H.I.E.L.D. · Sezon 5",
    type: "season",
    lane: "legacy",
    story: "2017–18 · paralel",
    releaseYear: 2017,
    totalUnits: 22,
    availableUnits: 22,
    code: "S5",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 50
    }
  },
  {
    id: "ragnarok",
    title: "Thor: Ragnarok",
    type: "film",
    lane: "core",
    story: "2017",
    releaseYear: 2017,
    totalUnits: 1,
    availableUnits: 1,
    code: "R",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 51
    }
  },
  {
    id: "team-darryl",
    title: "Team Darryl",
    type: "short",
    lane: "short",
    story: "2017 · alternatif kısa",
    releaseYear: 2018,
    totalUnits: 1,
    availableUnits: 1,
    code: "TD",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 52
    }
  },
  {
    id: "punisher-s2",
    title: "The Punisher · Sezon 2",
    type: "season",
    lane: "defenders",
    story: "2017",
    releaseYear: 2019,
    totalUnits: 13,
    availableUnits: 13,
    code: "P2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 53
    }
  },
  {
    id: "jessica-jones-s3",
    title: "Jessica Jones · Sezon 3",
    type: "season",
    lane: "defenders",
    story: "2017",
    releaseYear: 2019,
    totalUnits: 13,
    availableUnits: 13,
    code: "JJ3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 54
    }
  },
  {
    id: "inhumans-s1",
    title: "Inhumans · Sezon 1",
    type: "season",
    lane: "legacy",
    story: "2017 · Legacy TV",
    releaseYear: 2017,
    totalUnits: 8,
    availableUnits: 8,
    code: "INH",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 55
    }
  },
  {
    id: "runaways-s1",
    title: "Runaways · Sezon 1",
    type: "season",
    lane: "legacy",
    story: "2017",
    releaseYear: 2017,
    totalUnits: 10,
    availableUnits: 10,
    code: "R1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 56
    }
  },
  {
    id: "cloak-dagger-s1",
    title: "Cloak & Dagger · Sezon 1",
    type: "season",
    lane: "legacy",
    story: "2018",
    releaseYear: 2018,
    totalUnits: 10,
    availableUnits: 10,
    code: "CD1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 57
    }
  },
  {
    id: "runaways-s2",
    title: "Runaways · Sezon 2",
    type: "season",
    lane: "legacy",
    story: "2018",
    releaseYear: 2018,
    totalUnits: 13,
    availableUnits: 13,
    code: "R2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 58
    }
  },
  {
    id: "cloak-dagger-s2",
    title: "Cloak & Dagger · Sezon 2",
    type: "season",
    lane: "legacy",
    story: "2019",
    releaseYear: 2019,
    totalUnits: 10,
    availableUnits: 10,
    code: "CD2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 59
    }
  },
  {
    id: "runaways-s3",
    title: "Runaways · Sezon 3",
    type: "season",
    lane: "legacy",
    story: "2019",
    releaseYear: 2019,
    totalUnits: 10,
    availableUnits: 10,
    code: "R3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 60
    }
  },
  {
    id: "ant-man-wasp",
    title: "Ant-Man and the Wasp",
    type: "film",
    lane: "core",
    story: "2018",
    releaseYear: 2018,
    totalUnits: 1,
    availableUnits: 1,
    code: "AW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 61
    }
  },
  {
    id: "infinity-war",
    title: "Avengers: Infinity War",
    type: "film",
    lane: "core",
    story: "2018",
    releaseYear: 2018,
    totalUnits: 1,
    availableUnits: 1,
    code: "IW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 62
    }
  },
  {
    id: "aos-s6",
    title: "Agents of S.H.I.E.L.D. · Sezon 6",
    type: "season",
    lane: "legacy",
    story: "2019 · ayrışan hat",
    releaseYear: 2019,
    totalUnits: 13,
    availableUnits: 13,
    code: "S6",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 63
    }
  },
  {
    id: "aos-s7",
    title: "Agents of S.H.I.E.L.D. · Sezon 7",
    type: "season",
    lane: "legacy",
    story: "1931–2019 · zaman yolculuğu",
    releaseYear: 2020,
    totalUnits: 13,
    availableUnits: 13,
    code: "S7",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 64
    }
  },
  {
    id: "helstrom-s1",
    title: "Helstrom · Sezon 1",
    type: "season",
    lane: "legacy",
    story: "2020 · bağımsız hat",
    releaseYear: 2020,
    totalUnits: 10,
    availableUnits: 10,
    code: "HEL",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 65
    }
  },
  {
    id: "endgame",
    title: "Avengers: Endgame",
    type: "film",
    lane: "core",
    story: "2018–23",
    releaseYear: 2019,
    totalUnits: 1,
    availableUnits: 1,
    code: "EG",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 66
    }
  },
  {
    id: "loki-s1",
    title: "Loki · Sezon 1",
    type: "season",
    lane: "core",
    story: "Zamanın dışında",
    releaseYear: 2021,
    totalUnits: 6,
    availableUnits: 6,
    code: "L1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 67
    }
  },
  {
    id: "loki-s2",
    title: "Loki · Sezon 2",
    type: "season",
    lane: "core",
    story: "Zamanın dışında",
    releaseYear: 2023,
    totalUnits: 6,
    availableUnits: 6,
    code: "L2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 68
    }
  },
  {
    id: "what-if-s1",
    title: "What If...? · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Multiverse",
    releaseYear: 2021,
    totalUnits: 9,
    availableUnits: 9,
    code: "WI1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 69
    }
  },
  {
    id: "what-if-s2",
    title: "What If...? · Sezon 2",
    type: "season",
    lane: "animation",
    story: "Multiverse",
    releaseYear: 2023,
    totalUnits: 9,
    availableUnits: 9,
    code: "WI2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 70
    }
  },
  {
    id: "what-if-s3",
    title: "What If...? · Sezon 3",
    type: "season",
    lane: "animation",
    story: "Multiverse",
    releaseYear: 2024,
    totalUnits: 8,
    availableUnits: 8,
    code: "WI3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 71
    }
  },
  {
    id: "friendly-spider-s1",
    title: "Your Friendly Neighborhood Spider-Man · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Alternatif evren",
    releaseYear: 2025,
    totalUnits: 10,
    availableUnits: 10,
    code: "YFN",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 72
    }
  },
  {
    id: "marvel-zombies-s1",
    title: "Marvel Zombies · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Alternatif evren",
    releaseYear: 2025,
    totalUnits: 4,
    availableUnits: 4,
    code: "MZ",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 73
    }
  },
  {
    id: "wandavision-s1",
    title: "WandaVision · Sezon 1",
    type: "season",
    lane: "core",
    story: "2023",
    releaseYear: 2021,
    totalUnits: 9,
    availableUnits: 9,
    code: "WV",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 74
    }
  },
  {
    id: "shang-chi",
    title: "Shang-Chi and the Legend of the Ten Rings",
    type: "film",
    lane: "core",
    story: "2024",
    releaseYear: 2021,
    totalUnits: 1,
    availableUnits: 1,
    code: "SC",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 75
    }
  },
  {
    id: "falcon-winter-soldier-s1",
    title: "The Falcon and the Winter Soldier · Sezon 1",
    type: "season",
    lane: "core",
    story: "2024",
    releaseYear: 2021,
    totalUnits: 6,
    availableUnits: 6,
    code: "FWS",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 76
    }
  },
  {
    id: "far-from-home",
    title: "Spider-Man: Far From Home",
    type: "film",
    lane: "core",
    story: "2024",
    releaseYear: 2019,
    totalUnits: 1,
    availableUnits: 1,
    code: "FFH",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 77
    }
  },
  {
    id: "peters-to-do-list",
    title: "Peter’s To-Do List",
    type: "short",
    lane: "short",
    story: "2024",
    releaseYear: 2019,
    totalUnits: 1,
    availableUnits: 1,
    code: "PT",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 78
    }
  },
  {
    id: "daily-bugle-s1",
    title: "The Daily Bugle · Sezon 1",
    type: "season",
    lane: "short",
    story: "2024 · dijital",
    releaseYear: 2019,
    totalUnits: 5,
    availableUnits: 5,
    code: "DB1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 79
    }
  },
  {
    id: "eternals",
    title: "Eternals",
    type: "film",
    lane: "core",
    story: "2024",
    releaseYear: 2021,
    totalUnits: 1,
    availableUnits: 1,
    code: "E",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 80
    }
  },
  {
    id: "no-way-home",
    title: "Spider-Man: No Way Home",
    type: "film",
    lane: "core",
    story: "2024",
    releaseYear: 2021,
    totalUnits: 1,
    availableUnits: 1,
    code: "NWH",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 81
    }
  },
  {
    id: "daily-bugle-s2",
    title: "The Daily Bugle · Sezon 2",
    type: "season",
    lane: "short",
    story: "2024 · dijital",
    releaseYear: 2021,
    totalUnits: 13,
    availableUnits: 13,
    code: "DB2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 82
    }
  },
  {
    id: "multiverse-madness",
    title: "Doctor Strange in the Multiverse of Madness",
    type: "film",
    lane: "core",
    story: "2024",
    releaseYear: 2022,
    totalUnits: 1,
    availableUnits: 1,
    code: "MOM",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 83
    }
  },
  {
    id: "hawkeye-s1",
    title: "Hawkeye · Sezon 1",
    type: "season",
    lane: "core",
    story: "Noel 2024",
    releaseYear: 2021,
    totalUnits: 6,
    availableUnits: 6,
    code: "HK",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 84
    }
  },
  {
    id: "moon-knight-s1",
    title: "Moon Knight · Sezon 1",
    type: "season",
    lane: "core",
    story: "2025",
    releaseYear: 2022,
    totalUnits: 6,
    availableUnits: 6,
    code: "MK",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 85
    }
  },
  {
    id: "wakanda-forever",
    title: "Black Panther: Wakanda Forever",
    type: "film",
    lane: "core",
    story: "2025",
    releaseYear: 2022,
    totalUnits: 1,
    availableUnits: 1,
    code: "WF",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 86
    }
  },
  {
    id: "echo-s1",
    title: "Echo · Sezon 1",
    type: "season",
    lane: "core",
    story: "2025",
    releaseYear: 2024,
    totalUnits: 5,
    availableUnits: 5,
    code: "EC",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 87
    }
  },
  {
    id: "she-hulk-s1",
    title: "She-Hulk: Attorney at Law · Sezon 1",
    type: "season",
    lane: "core",
    story: "2025",
    releaseYear: 2022,
    totalUnits: 9,
    availableUnits: 9,
    code: "SH",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 88
    }
  },
  {
    id: "ms-marvel-s1",
    title: "Ms. Marvel · Sezon 1",
    type: "season",
    lane: "core",
    story: "2025",
    releaseYear: 2022,
    totalUnits: 6,
    availableUnits: 6,
    code: "MS",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 89
    }
  },
  {
    id: "love-thunder",
    title: "Thor: Love and Thunder",
    type: "film",
    lane: "core",
    story: "2025",
    releaseYear: 2022,
    totalUnits: 1,
    availableUnits: 1,
    code: "LT",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 90
    }
  },
  {
    id: "ironheart-s1",
    title: "Ironheart · Sezon 1",
    type: "season",
    lane: "core",
    story: "2025",
    releaseYear: 2025,
    totalUnits: 6,
    availableUnits: 6,
    code: "IH",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 91
    }
  },
  {
    id: "werewolf-night",
    title: "Werewolf by Night",
    type: "special",
    lane: "core",
    story: "2025",
    releaseYear: 2022,
    totalUnits: 1,
    availableUnits: 1,
    code: "WN",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 92
    }
  },
  {
    id: "guardians-holiday",
    title: "The Guardians of the Galaxy Holiday Special",
    type: "special",
    lane: "core",
    story: "Noel 2025",
    releaseYear: 2022,
    totalUnits: 1,
    availableUnits: 1,
    code: "GHS",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 93
    }
  },
  {
    id: "quantumania",
    title: "Ant-Man and the Wasp: Quantumania",
    type: "film",
    lane: "core",
    story: "2026",
    releaseYear: 2023,
    totalUnits: 1,
    availableUnits: 1,
    code: "Q",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 94
    }
  },
  {
    id: "guardians-3",
    title: "Guardians of the Galaxy Vol. 3",
    type: "film",
    lane: "core",
    story: "2026",
    releaseYear: 2023,
    totalUnits: 1,
    availableUnits: 1,
    code: "G3",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 95
    }
  },
  {
    id: "secret-invasion-s1",
    title: "Secret Invasion · Sezon 1",
    type: "season",
    lane: "core",
    story: "2026",
    releaseYear: 2023,
    totalUnits: 6,
    availableUnits: 6,
    code: "SI",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 96
    }
  },
  {
    id: "the-marvels",
    title: "The Marvels",
    type: "film",
    lane: "core",
    story: "2026",
    releaseYear: 2023,
    totalUnits: 1,
    availableUnits: 1,
    code: "M",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 97
    }
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    type: "film",
    lane: "multiverse",
    story: "2024 / TVA",
    releaseYear: 2024,
    totalUnits: 1,
    availableUnits: 1,
    code: "DW",
    universes: [
      "mcu",
      "xmen"
    ],
    orderByUniverse: {
      mcu: 98,
      xmen: 14
    }
  },
  {
    id: "agatha-s1",
    title: "Agatha All Along · Sezon 1",
    type: "season",
    lane: "core",
    story: "2026",
    releaseYear: 2024,
    totalUnits: 9,
    availableUnits: 9,
    code: "AA",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 99
    }
  },
  {
    id: "daredevil-ba-s1",
    title: "Daredevil: Born Again · Sezon 1",
    type: "season",
    lane: "core",
    story: "2027",
    releaseYear: 2025,
    totalUnits: 9,
    availableUnits: 9,
    code: "DB1",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 100
    }
  },
  {
    id: "brave-new-world",
    title: "Captain America: Brave New World",
    type: "film",
    lane: "core",
    story: "2027",
    releaseYear: 2025,
    totalUnits: 1,
    availableUnits: 1,
    code: "BNW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 101
    }
  },
  {
    id: "thunderbolts",
    title: "Thunderbolts*",
    type: "film",
    lane: "core",
    story: "2027",
    releaseYear: 2025,
    totalUnits: 1,
    availableUnits: 1,
    code: "TB",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 102
    }
  },
  {
    id: "wonder-man-s1",
    title: "Wonder Man · Sezon 1",
    type: "season",
    lane: "core",
    story: "2027",
    releaseYear: 2026,
    totalUnits: 8,
    availableUnits: 8,
    code: "WM",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 103
    }
  },
  {
    id: "punisher-one-last-kill",
    title: "The Punisher: One Last Kill",
    type: "special",
    lane: "core",
    story: "2027",
    releaseYear: 2026,
    totalUnits: 1,
    availableUnits: 1,
    code: "POL",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 104
    }
  },
  {
    id: "daredevil-ba-s2",
    title: "Daredevil: Born Again · Sezon 2",
    type: "season",
    lane: "core",
    story: "2027",
    releaseYear: 2026,
    totalUnits: 8,
    availableUnits: 8,
    code: "DB2",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 105
    }
  },
  {
    id: "brand-new-day",
    title: "Spider-Man: Brand New Day",
    type: "film",
    lane: "core",
    story: "2028",
    releaseYear: 2026,
    totalUnits: 1,
    availableUnits: 1,
    code: "BND",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 106
    }
  },
  {
    id: "visionquest-s1",
    title: "VisionQuest · Sezon 1",
    type: "season",
    lane: "future",
    story: "WandaVision sonrası",
    releaseYear: 2026,
    totalUnits: 8,
    availableUnits: 0,
    code: "VQ",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 107
    }
  },
  {
    id: "avengers-doomsday",
    title: "Avengers: Doomsday",
    type: "film",
    lane: "future",
    story: "Multiverse Saga final yolu",
    releaseYear: 2026,
    totalUnits: 1,
    availableUnits: 0,
    code: "D",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 108
    }
  },
  {
    id: "avengers-secret-wars",
    title: "Avengers: Secret Wars",
    type: "film",
    lane: "future",
    story: "Doomsday sonrası",
    releaseYear: 2027,
    totalUnits: 1,
    availableUnits: 0,
    code: "SW",
    universes: [
      "mcu"
    ],
    orderByUniverse: {
      mcu: 109
    }
  },
  {
    id: "xmen-first-class",
    title: "X-Men: First Class",
    type: "film",
    lane: "fox",
    story: "1962 · ortak başlangıç",
    releaseYear: 2011,
    totalUnits: 1,
    availableUnits: 1,
    code: "FC",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 1
    }
  },
  {
    id: "xmen-origins-wolverine",
    title: "X-Men Origins: Wolverine",
    type: "film",
    lane: "fox",
    story: "1845–1979 · orijinal hat",
    releaseYear: 2009,
    totalUnits: 1,
    availableUnits: 1,
    code: "OW",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 2
    }
  },
  {
    id: "xmen",
    title: "X-Men",
    type: "film",
    lane: "fox",
    story: "2000 · orijinal hat",
    releaseYear: 2000,
    totalUnits: 1,
    availableUnits: 1,
    code: "X",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 3
    }
  },
  {
    id: "x2",
    title: "X2: X-Men United",
    type: "film",
    lane: "fox",
    story: "2003 · orijinal hat",
    releaseYear: 2003,
    totalUnits: 1,
    availableUnits: 1,
    code: "X2",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 4
    }
  },
  {
    id: "xmen-last-stand",
    title: "X-Men: The Last Stand",
    type: "film",
    lane: "fox",
    story: "2006 · orijinal hat",
    releaseYear: 2006,
    totalUnits: 1,
    availableUnits: 1,
    code: "X3",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 5
    }
  },
  {
    id: "the-wolverine",
    title: "The Wolverine",
    type: "film",
    lane: "fox",
    story: "2013 · orijinal hat",
    releaseYear: 2013,
    totalUnits: 1,
    availableUnits: 1,
    code: "W",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 6
    }
  },
  {
    id: "days-future-past",
    title: "X-Men: Days of Future Past",
    type: "film",
    lane: "fox",
    story: "1973 / 2023 · zaman kırılması",
    releaseYear: 2014,
    totalUnits: 1,
    availableUnits: 1,
    code: "DFP",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 7
    }
  },
  {
    id: "xmen-apocalypse",
    title: "X-Men: Apocalypse",
    type: "film",
    lane: "fox",
    story: "1983 · yenilenmiş hat",
    releaseYear: 2016,
    totalUnits: 1,
    availableUnits: 1,
    code: "XA",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 8
    }
  },
  {
    id: "dark-phoenix",
    title: "Dark Phoenix",
    type: "film",
    lane: "fox",
    story: "1992 · yenilenmiş hat",
    releaseYear: 2019,
    totalUnits: 1,
    availableUnits: 1,
    code: "DP",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 9
    }
  },
  {
    id: "deadpool",
    title: "Deadpool",
    type: "film",
    lane: "fox",
    story: "2016 · yenilenmiş hat",
    releaseYear: 2016,
    totalUnits: 1,
    availableUnits: 1,
    code: "D",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 10
    }
  },
  {
    id: "new-mutants",
    title: "The New Mutants",
    type: "film",
    lane: "fox",
    story: "2017 · yenilenmiş hat",
    releaseYear: 2020,
    totalUnits: 1,
    availableUnits: 1,
    code: "NM",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 11
    }
  },
  {
    id: "deadpool-2",
    title: "Deadpool 2",
    type: "film",
    lane: "fox",
    story: "2018 · yenilenmiş hat",
    releaseYear: 2018,
    totalUnits: 1,
    availableUnits: 1,
    code: "D2",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 12
    }
  },
  {
    id: "logan",
    title: "Logan",
    type: "film",
    lane: "fox",
    story: "2029 · olası gelecek",
    releaseYear: 2017,
    totalUnits: 1,
    availableUnits: 1,
    code: "L",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 13
    }
  },
  {
    id: "xmen-tas-s1",
    title: "X-Men: The Animated Series · Sezon 1",
    type: "season",
    lane: "tas",
    story: "1992 hattı",
    releaseYear: 1992,
    totalUnits: 13,
    availableUnits: 13,
    code: "XT1",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 15
    }
  },
  {
    id: "xmen-tas-s2",
    title: "X-Men: The Animated Series · Sezon 2",
    type: "season",
    lane: "tas",
    story: "1993 hattı",
    releaseYear: 1993,
    totalUnits: 13,
    availableUnits: 13,
    code: "XT2",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 16
    }
  },
  {
    id: "xmen-tas-s3",
    title: "X-Men: The Animated Series · Sezon 3",
    type: "season",
    lane: "tas",
    story: "1994 hattı",
    releaseYear: 1994,
    totalUnits: 19,
    availableUnits: 19,
    code: "XT3",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 17
    }
  },
  {
    id: "xmen-tas-s4",
    title: "X-Men: The Animated Series · Sezon 4",
    type: "season",
    lane: "tas",
    story: "1995 hattı",
    releaseYear: 1995,
    totalUnits: 17,
    availableUnits: 17,
    code: "XT4",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 18
    }
  },
  {
    id: "xmen-tas-s5",
    title: "X-Men: The Animated Series · Sezon 5",
    type: "season",
    lane: "tas",
    story: "1996 hattı",
    releaseYear: 1996,
    totalUnits: 14,
    availableUnits: 14,
    code: "XT5",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 19
    }
  },
  {
    id: "xmen-97-s1",
    title: "X-Men ’97 · Sezon 1",
    type: "season",
    lane: "tas",
    story: "1997 · doğrudan devam",
    releaseYear: 2024,
    totalUnits: 10,
    availableUnits: 10,
    code: "971",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 20
    }
  },
  {
    id: "xmen-97-s2",
    title: "X-Men ’97 · Sezon 2",
    type: "season",
    lane: "tas",
    story: "1997 / zaman kırılması",
    releaseYear: 2026,
    totalUnits: 9,
    availableUnits: 7,
    code: "972",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 21
    }
  },
  {
    id: "legion-s1",
    title: "Legion · Sezon 1",
    type: "season",
    lane: "live",
    story: "Bağımsız mutant evreni",
    releaseYear: 2017,
    totalUnits: 8,
    availableUnits: 8,
    code: "LG1",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 22
    }
  },
  {
    id: "legion-s2",
    title: "Legion · Sezon 2",
    type: "season",
    lane: "live",
    story: "Bağımsız mutant evreni",
    releaseYear: 2018,
    totalUnits: 11,
    availableUnits: 11,
    code: "LG2",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 23
    }
  },
  {
    id: "legion-s3",
    title: "Legion · Sezon 3",
    type: "season",
    lane: "live",
    story: "Bağımsız mutant evreni",
    releaseYear: 2019,
    totalUnits: 8,
    availableUnits: 8,
    code: "LG3",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 24
    }
  },
  {
    id: "gifted-s1",
    title: "The Gifted · Sezon 1",
    type: "season",
    lane: "live",
    story: "X-Men’in kayıp olduğu alternatif hat",
    releaseYear: 2017,
    totalUnits: 13,
    availableUnits: 13,
    code: "GF1",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 25
    }
  },
  {
    id: "gifted-s2",
    title: "The Gifted · Sezon 2",
    type: "season",
    lane: "live",
    story: "X-Men’in kayıp olduğu alternatif hat",
    releaseYear: 2018,
    totalUnits: 16,
    availableUnits: 16,
    code: "GF2",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 26
    }
  },
  {
    id: "pryde-xmen",
    title: "X-Men: Pryde of the X-Men",
    type: "special",
    lane: "animation",
    story: "Bağımsız animasyon pilotu",
    releaseYear: 1989,
    totalUnits: 1,
    availableUnits: 1,
    code: "PX",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 27
    }
  },
  {
    id: "xmen-evolution-s1",
    title: "X-Men: Evolution · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Alternatif gençlik hattı",
    releaseYear: 2000,
    totalUnits: 13,
    availableUnits: 13,
    code: "XE1",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 28
    }
  },
  {
    id: "xmen-evolution-s2",
    title: "X-Men: Evolution · Sezon 2",
    type: "season",
    lane: "animation",
    story: "Alternatif gençlik hattı",
    releaseYear: 2001,
    totalUnits: 17,
    availableUnits: 17,
    code: "XE2",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 29
    }
  },
  {
    id: "xmen-evolution-s3",
    title: "X-Men: Evolution · Sezon 3",
    type: "season",
    lane: "animation",
    story: "Alternatif gençlik hattı",
    releaseYear: 2002,
    totalUnits: 13,
    availableUnits: 13,
    code: "XE3",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 30
    }
  },
  {
    id: "xmen-evolution-s4",
    title: "X-Men: Evolution · Sezon 4",
    type: "season",
    lane: "animation",
    story: "Alternatif gençlik hattı",
    releaseYear: 2003,
    totalUnits: 9,
    availableUnits: 9,
    code: "XE4",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 31
    }
  },
  {
    id: "wolverine-xmen-s1",
    title: "Wolverine and the X-Men · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Alternatif animasyon hattı",
    releaseYear: 2009,
    totalUnits: 26,
    availableUnits: 26,
    code: "WXM",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 32
    }
  },
  {
    id: "xmen-anime-s1",
    title: "Marvel Anime: X-Men · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Anime evreni",
    releaseYear: 2011,
    totalUnits: 12,
    availableUnits: 12,
    code: "XMA",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 33
    }
  },
  {
    id: "wolverine-anime-s1",
    title: "Marvel Anime: Wolverine · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Anime evreni",
    releaseYear: 2011,
    totalUnits: 12,
    availableUnits: 12,
    code: "WMA",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 34
    }
  },
  {
    id: "generation-x",
    title: "Generation X",
    type: "film",
    lane: "archive",
    story: "Bağımsız TV filmi",
    releaseYear: 1996,
    totalUnits: 1,
    availableUnits: 1,
    code: "GX",
    universes: [
      "xmen"
    ],
    orderByUniverse: {
      xmen: 35
    }
  },
  {
    id: "fantastic-four-2005",
    title: "Fantastic Four",
    type: "film",
    lane: "fox2005",
    story: "2005 devamlılığı",
    releaseYear: 2005,
    totalUnits: 1,
    availableUnits: 1,
    code: "4",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 1
    }
  },
  {
    id: "silver-surfer",
    title: "Fantastic Four: Rise of the Silver Surfer",
    type: "film",
    lane: "fox2005",
    story: "2005 devamlılığı",
    releaseYear: 2007,
    totalUnits: 1,
    availableUnits: 1,
    code: "SS",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 2
    }
  },
  {
    id: "fantastic-four-2015",
    title: "Fantastic Four",
    type: "film",
    lane: "reboot",
    story: "2015 yeniden başlangıcı",
    releaseYear: 2015,
    totalUnits: 1,
    availableUnits: 1,
    code: "F4",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 3
    }
  },
  {
    id: "fantastic-four-1967-s1",
    title: "Fantastic Four (1967) · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Hanna-Barbera evreni",
    releaseYear: 1967,
    totalUnits: 20,
    availableUnits: 20,
    code: "671",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 5
    }
  },
  {
    id: "new-fantastic-four-s1",
    title: "The New Fantastic Four · Sezon 1",
    type: "season",
    lane: "animation",
    story: "1978 animasyon evreni",
    releaseYear: 1978,
    totalUnits: 13,
    availableUnits: 13,
    code: "781",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 6
    }
  },
  {
    id: "the-thing-1979-s1",
    title: "The Thing · Sezon 1",
    type: "season",
    lane: "animation",
    story: "1979 bağımsız animasyon",
    releaseYear: 1979,
    totalUnits: 13,
    availableUnits: 13,
    code: "TH",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 7
    }
  },
  {
    id: "fantastic-four-1994-s1",
    title: "Fantastic Four (1994) · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Marvel Action Hour",
    releaseYear: 1994,
    totalUnits: 13,
    availableUnits: 13,
    code: "941",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 8
    }
  },
  {
    id: "fantastic-four-1994-s2",
    title: "Fantastic Four (1994) · Sezon 2",
    type: "season",
    lane: "animation",
    story: "Marvel Action Hour",
    releaseYear: 1995,
    totalUnits: 13,
    availableUnits: 13,
    code: "942",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 9
    }
  },
  {
    id: "silver-surfer-1998-s1",
    title: "Silver Surfer · Sezon 1",
    type: "season",
    lane: "animation",
    story: "Bağımsız kozmik animasyon",
    releaseYear: 1998,
    totalUnits: 13,
    availableUnits: 13,
    code: "SUR",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 10
    }
  },
  {
    id: "fantastic-four-wgh-s1",
    title: "Fantastic Four: World’s Greatest Heroes · Sezon 1",
    type: "season",
    lane: "animation",
    story: "2006 animasyon evreni",
    releaseYear: 2006,
    totalUnits: 26,
    availableUnits: 26,
    code: "WGH",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 11
    }
  },
  {
    id: "fantastic-four-1994-unreleased",
    title: "The Fantastic Four (1994)",
    type: "film",
    lane: "archive",
    story: "Resmî olarak yayımlanmadı",
    releaseYear: 1994,
    totalUnits: 1,
    availableUnits: 0,
    code: "VAULT",
    universes: [
      "f4"
    ],
    orderByUniverse: {
      f4: 12
    }
  }
];
