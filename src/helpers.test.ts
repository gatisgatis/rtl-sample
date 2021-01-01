import axios from "axios";
import {v4} from "uuid";
import { addRandomId, getSingleChar, makeFullName } from "./helpers";

describe("getSingleChar function", () => {
  it("should resolve api request and return array with corrct data using spyOn", async () => {
    const char = {
      name: "Morty Smith",
      gender: "Male",
      id: 2,
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      something: "not needed",
    };
    const expectedOutput = [
      {
        name: "Morty Smith",
        gender: "Male",
        id: 2,
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ];
    const resp = {
      data: char,
    };
    const axiosSpy = jest.spyOn(axios, "get");
    axiosSpy.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        if (true) {
          resolve(resp);
        } else {
          reject("Err");
        }
      });
    });
    const res = await getSingleChar();
    expect(res).toEqual(expectedOutput);
  });
});

jest.mock("axios");

describe("getSingleChar function 2", () => {
  it("should resolve api request and return array with corrct data using module mocking", async () => {
    const char = {
      name: "Morty Smith",
      gender: "Male",
      id: 2,
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      something: "not needed",
    };
    const expectedOutput = [
      {
        name: "Morty Smith",
        gender: "Male",
        id: 2,
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      },
    ];
    const resp = {
      data: char,
    };
    // @ts-ignore
    axios.get.mockImplementation(() => {
      const response = new Promise((resolve, reject) => {
        if (true) {
          resolve(resp);
        } else {
          reject("Err");
        }
      });
      return response;
    });
    await getSingleChar().then((res) => {
      expect(res).toEqual(expectedOutput);
    });
  });
});

jest.mock('uuid', () => ({
  v4: jest.fn()
}))

describe("addRandomId function", () => {
  it("should generate random id and add it to object using spyOn mocking uuid", () => {
    // const v4spy = jest.spyOn(uuid, "v4");
    v4.mockImplementation(() => "123-456");

    // uuid.mockImplementation(() => "123-456");
    const result = addRandomId("A");
    console.log(result);
    expect(result).toEqual({ 0: "A", uniqId: "123-456" });
  });
});

describe("makeFullName function", () => {
  it("should take in any object containing firstName and lastName entry and return new object with fullName entry", () => {
    const input = {
      gender: "male",
      firstName: "John",
      lastName: "Jonhy",
      age: 10,
    };
    const outputShouldBe = {
      ...input,
      fullname: "John Jonhy",
    };
    const result = makeFullName(input);
    expect(result).toEqual(outputShouldBe);
  });
});
