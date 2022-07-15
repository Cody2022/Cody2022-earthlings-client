import React, { useEffect, useState } from "react";
import "../../App.css"

//http://localhost:5000/schedule?email=test4@gmail.com&task=translate
//result: volunteer: email example: volunteer4@gmail.com
//do search based on userloginRequest (include Data!!!!!)

const doSearch = async (phrase) => {
  const email = phrase.email;
  try {
    const response = await fetch(`/schedule?${email}&task=${phrase}`);
    return await response.json();
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const SearchTaskSlot = ({ setSearch, refresh }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      const matches = await doSearch(text);
      setSearch(matches);
    })();
  }, [text, setSearch, refresh]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for Match Volunteers.."
        onChange={(evt) => {
          setText(evt.target.value);
        }}
      />
    </div>
  );
};

export default SearchTaskSlot;
