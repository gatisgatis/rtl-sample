import React, { useState, useEffect } from "react";
import _ from "lodash";
import { CharInfo, getSingleChar, makeFullName, addRandomId } from "./helpers";
import { FullName } from "./FullName";
import "./App.css";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [showImg, setShowImg] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [extra, setExtra] = useState(false);
  const [character, setCharacter] = useState<CharInfo>();
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [userInfo, setUserInfo] = useState<Object[]>([]);

  useEffect(() => {
    getSingleChar().then((res) => {
      setCharacter(res[0]);
      setLoading(false);
    });
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputLastName || !inputFirstName) {
      return;
    }
    const names = { firstName: inputFirstName, lastName: inputLastName };
    const user = makeFullName(names);
    setInputFirstName("");
    setInputLastName("");
    setUserInfo([...userInfo, user]);
  };

  const clicker = () => {};

  const marrr = [0, 3, 5, 2, 5, 1, 0];
  const sarr = [0, 0, 0, 1];

  const filterMar = marrr.filter((num) => num);
  const filtersarr = sarr.filter((num) => num);

  console.log(filterMar);
  console.log(filtersarr);

  if (loading) {
    return (
      <div>
        <button onClick={() => clicker}>SPIED</button>
        <h2>LOADING...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setShowImg(!showImg)}>TOGGLE IMG</button>
      <button onClick={() => setShowHeader(!showHeader)}>
        TOGGLE FIRST TITLE
      </button>
      <button onClick={() => setExtra(!extra)}>TOGGLE EXTRA TITLE</button>
      {showHeader && <h1>FIRST TITLE</h1>}
      {character && (
        <h3>
          {character.name}, {character.gender}
        </h3>
      )}
      {extra && <h1>EXTRA TITLE</h1>}
      <form action="submit" onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="first-name">
          <input
            type="text"
            id="first-name"
            placeholder="First Name"
            value={inputFirstName}
            onChange={(e) => setInputFirstName(e.target.value)}
          />
          <input
            type="text"
            id="last-name"
            placeholder="Last Name"
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
          />
          <button type="submit">Confirm</button>
        </label>
      </form>
      <div className="wrapper">
        {showImg && (
          <img
            className="img"
            src={character!.image}
            alt="random"
            onLoad={() => console.log("loaded")}
          />
        )}
      </div>
      {userInfo.map((user) => {
        const renderUser = addRandomId(user);
        return (
          <div key={renderUser.uniqId}>
            {/* @ts-ignore */}
            <FullName text={renderUser.fullname} />
          </div>
        );
      })}
    </div>
  );
};
