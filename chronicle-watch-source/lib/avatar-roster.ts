export type HeroAvatar = {
  id: string;
  name: string;
  universe: "MCU" | "X-Men" | "Fantastic Four";
  imageUrl: string;
  position: string;
};

const PROFILE_BASE = "https://image.tmdb.org/t/p/w342";

function hero(id: string, name: string, universe: HeroAvatar["universe"], profilePath: string): HeroAvatar {
  return { id, name, universe, imageUrl: `${PROFILE_BASE}${profilePath}`, position: "50% 22%" };
}

export const heroAvatars: HeroAvatar[] = [
  hero("iron-man", "Iron Man", "MCU", "/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"),
  hero("captain-america", "Captain America", "MCU", "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"),
  hero("thor", "Thor", "MCU", "/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"),
  hero("hulk", "Hulk", "MCU", "/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"),
  hero("black-widow", "Black Widow", "MCU", "/druW5adKddizHNSoPbI0q7Mvn0K.jpg"),
  hero("hawkeye", "Hawkeye", "MCU", "/yB84D1neTYXfWBaV0QOE9RF2VCu.jpg"),
  hero("black-panther", "Black Panther", "MCU", "/nL16SKfyP1b7Hk6LsuWiqMfbdb8.jpg"),
  hero("captain-marvel", "Captain Marvel", "MCU", "/iqZ5uKJWbwSITCK4CqdlUHZTnXD.jpg"),
  hero("spider-man", "Spider-Man", "MCU", "/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg"),
  hero("doctor-strange", "Doctor Strange", "MCU", "/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"),
  hero("scarlet-witch", "Scarlet Witch", "MCU", "/wIU675y4dofIDVuhaNWPizJNtep.jpg"),
  hero("vision", "Vision", "MCU", "/vcAVrAOZrpqmi37qjFdztRAv1u9.jpg"),
  hero("shang-chi", "Shang-Chi", "MCU", "/cCx2OghLj9KN73oyRZe92i2p3Ih.jpg"),
  hero("moon-knight", "Moon Knight", "MCU", "/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg"),
  hero("ms-marvel", "Ms. Marvel", "MCU", "/oBpOjLAH8heYNNJZN1Z5jVQhAKC.jpg"),
  hero("she-hulk", "She-Hulk", "MCU", "/x8lBkm9CBJbIlLpqjEwkQydZ2or.jpg"),
  hero("daredevil", "Daredevil", "MCU", "/jBHDZ8MA4I7krNQx4IfqdfPfleD.jpg"),
  hero("punisher", "Punisher", "MCU", "/o0t6EVkJOrFAjESDilZUlf46IbQ.jpg"),
  hero("wolverine", "Wolverine", "X-Men", "/4Xujtewxqt6aU0Y81tsS9gkjizk.jpg"),
  hero("deadpool", "Deadpool", "X-Men", "/trzgptffGvAlAT6MEu01fz47cLW.jpg"),
  hero("cyclops", "Cyclops", "X-Men", "/lf7OnfKZnMgNh9b98764tqSocGK.jpg"),
  hero("storm", "Storm", "X-Men", "/84HRDZodRCuBSpYGSc3ow8WucI4.jpg"),
  hero("jean-grey", "Jean Grey", "X-Men", "/uvZGwNsLqe9NyA57Qlt46IkO8Bd.jpg"),
  hero("beast", "Beast", "X-Men", "/pXm8GWTm9eIA8pUGOjvmYjlxamu.jpg"),
  hero("professor-x", "Professor X", "X-Men", "/ufqtnLh3JJjPbEgxEag3MM5nZyv.jpg"),
  hero("magneto", "Magneto", "X-Men", "/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg"),
  hero("mister-fantastic", "Mister Fantastic", "Fantastic Four", "/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"),
  hero("invisible-woman", "Invisible Woman", "Fantastic Four", "/tViEEsjvbhrJxWsOipUqIYjdHEb.jpg"),
  hero("human-torch", "Human Torch", "Fantastic Four", "/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg"),
  hero("the-thing", "The Thing", "Fantastic Four", "/xD8GVNayMpiTZxLfahy2DseYcQq.jpg"),
];

export function heroAvatarById(id: string) {
  return heroAvatars.find((avatar) => avatar.id === id) ?? heroAvatars[0];
}
