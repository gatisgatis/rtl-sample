import React from "react";
import axios from "axios";
import { v4 } from "uuid";

export type CharInfo = {
  name: string;
  gender: string;
  id: number;
  image: string;
};

export const getSingleChar = async () => {
  const output: CharInfo[] = await axios
    .get("https://rickandmortyapi.com/api/character/2")
    .then(({ data }) => {
      const { id, gender, image, name } = data;
      return [{ name, id, gender, image }];
    });
  return output;
};

//

// Takes any argument and returns it as an object with aditional ID key
export const addRandomId = <T extends { [key: string]: any }>(object: T) => {
  const result = { ...object, uniqId: v4() };
  return result;
};

console.log(addRandomId({}));

// Takes object containg at least firstName and lastName keys
// and returns new object containing additional fullName key
export const makeFullName = <T extends { firstName: string; lastName: string }>(
  something: T
) => {
  return {
    ...something,
    fullname: something.firstName + " " + something.lastName,
  };
};

makeFullName({
  firstName: "janis",
  lastName: "SENSEJS",
  age: 512,
});
