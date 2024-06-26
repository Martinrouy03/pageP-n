import { useState } from "react";
import data from "../../assets/material/data.json";
import "../../App.scss";

const SearchBar = ({ setPrayer, setPage, setMessage, setButton }) => {
  const [suggestions, setSuggestions] = useState("");
  const handleChange = (event) => {
    let sugg = [];
    setTxt(event.target.value);

    data.map((prayer) => {
      if (prayer.fr.title.toLowerCase().search(txt) > -1) {
        sugg.push(
          <p
            onClick={() => {
              setPrayer(prayer);
              setPage(prayer.fr.pageStart);
              setTxt(prayer.fr.title);
              setSuggestions("");
              setMessage("");
              setButton(0);
            }}
          >
            {prayer.fr.title}
          </p>
        );
      }
    });
    setSuggestions(sugg);
    if (event.target.value === "") {
      setSuggestions("");
    }
  };
  const [txt, setTxt] = useState("");
  return (
    <div className="search">
      <input
        onClick={() => {
          setTxt("");
        }}
        type="text"
        placeholder="Search prayer:"
        onChange={(event) => handleChange(event)}
        value={txt}
      />
      {suggestions && <div className="suggestions">{suggestions}</div>}
    </div>
  );
};
export default SearchBar;
