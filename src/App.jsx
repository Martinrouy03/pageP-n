import { useState, useEffect } from "react";
import "./App.scss";
import "./fonts.css";
import Header from "./assets/components/Header";
import SearchBar from "./assets/components/Searchbar";
import data from "./assets/material/data.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRepeat,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faRepeat, faChevronLeft, faChevronRight);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// console.log(data);
function App() {
  const welcomeMessageFR = `Bienvenue aux Kagyu Mönlam 2024! Edition Française: 2022`;
  const welcomeMessageEN =
    "Welcome to Kagyu Mönlam 2024! English edition:   2023";

  const indexLast = data.length;
  const pageMin = data[0].fr.pageStart;
  const pageMaxFR = data[indexLast - 1].fr.pageEnd;
  const pageMaxEN = data[indexLast - 1].en.pageEnd;
  const [pageFR, setPageFR] = useState(7);
  const [pageEN, setPageEN] = useState(1);
  const [messageFR, setMessageFR] = useState(welcomeMessageFR);
  const [messageEN, setMessageEN] = useState(welcomeMessageEN);
  const [button, setButton] = useState(0);
  const [prayer, setPrayer] = useState(data[0]);
  const [storage, setStorage] = useState(
    JSON.parse(window.localStorage.getItem("options"))
  );
  const [newOptionFR, setNewOptionFR] = useState("");
  const [newOptionEN, setNewOptionEN] = useState("");
  const [optionsTxt, setOptionsTxt] = useState([]);
  const myOptionsFunc = () => {
    const options = [];
    if (storage) {
      storage.map((option_txt, index) => {
        return options.push(
          <option key={index} value={option_txt}>
            {option_txt}
          </option>
        );
      });
    }
    setOptionsTxt(options);
  };
  const myButtonFunc = (buttonIndex) => {
    let msgFR = "";
    let msgEN = "";
    if (buttonIndex === 1) {
      msgFR = "🍵 PAUSE THÉ 🍵";
      msgEN = " TEA BREAK ";
    } else if (buttonIndex === 2) {
      msgFR = "📣 Annonces Locales 📣";
      msgEN = " Local Announcements ";
    } else if (buttonIndex === 3) {
      msgFR = " 🧘🏼... Reprise dans 10 minutes ...🧘🏻‍♀️";
      msgEN = "... Resuming in 10 minutes ...";
    } else if (buttonIndex === 4) {
      msgFR = "📜 Prière additionnelle (pas dans le livre) 📜";
      msgEN = " Additional prayer (not in the book) ";
    }
    if (messageFR && button === buttonIndex) {
      setMessageFR("");
      setMessageEN("");
      setButton(0);
    } else {
      setMessageFR(msgFR);
      setMessageEN(msgEN);
      setButton(buttonIndex);
    }
  };
  useEffect(() => {
    myOptionsFunc();
  }, [storage]);
  return (
    <>
      <Header />
      <main className="container">
        {messageFR ? (
          <div className="display-container">
            <div
              className="display-prayer"
              style={{ fontWeight: "bold", justifyContent: "center" }}
            >
              {messageFR}
            </div>
            <div
              className="display-prayer"
              style={{ fontStyle: "italic", justifyContent: "center" }}
            >
              {messageEN}
            </div>
          </div>
        ) : (
          <div className="display-container">
            <div className="display-prayer">
              <p>{prayer.fr.title}</p>
              <div>
                <span>p.{pageFR}</span>
              </div>
            </div>
            <div className="display-prayer">
              <p style={{ fontStyle: "italic", fontWeight: "unset" }}>
                {prayer.en.title}
              </p>
              <div style={{ fontStyle: "italic", fontWeight: "unset" }}>
                <span>~ p.{pageEN}</span>
              </div>
            </div>
          </div>
        )}
        <div className="control-panel">
          <div className="left-panel">
            <h2>Control Panel</h2>
            <div id="buttons">
              <button
                onClick={() => {
                  setMessageFR(welcomeMessageFR);
                  setMessageEN(welcomeMessageEN);
                  setButton(0);
                }}
              >
                Welcome
              </button>
              <button
                onClick={() => {
                  setMessageFR("");
                  setMessageEN("");
                  setButton(0);
                  setPrayer(data[0]);
                  setPageFR(7);
                  setPageEN(1);
                }}
              >
                START
              </button>
              <button
                onClick={() => {
                  setMessageFR("");
                  setMessageEN("");
                  setButton(0);
                  const SamantabhadraPrayer = data.find((p) =>
                    p.fr.title.includes("Samantabhadra")
                  );
                  setPrayer(SamantabhadraPrayer);
                  setPageFR(SamantabhadraPrayer.fr.pageStart);
                  setPageEN(SamantabhadraPrayer.en.pageStart);
                }}
              >
                Samantabhadra Prayer
              </button>
            </div>

            <form
              action=""
              onSubmit={(event) => {
                event.preventDefault();
                if (storage) {
                  const newStorage = [...storage];
                  newStorage.push([newOptionFR, newOptionEN]);
                  setStorage(newStorage);
                  window.localStorage.setItem(
                    "options",
                    JSON.stringify(newStorage)
                  );
                } else {
                  const initOption = [newOptionFR, newOptionEN];
                  window.localStorage.setItem(
                    "options",
                    JSON.stringify(initOption)
                  );
                  setStorage(initOption);
                }
              }}
            >
              <input
                type="text"
                placeholder="French"
                value={newOptionFR}
                onChange={(event) => setNewOptionFR(event.target.value)}
                onClick={() => {
                  setNewOptionFR("");
                }}
              />
              <input
                type="text"
                placeholder="English"
                value={newOptionEN}
                onChange={(event) => setNewOptionEN(event.target.value)}
                onClick={() => {
                  setNewOptionEN("");
                }}
              />
              <button>Add text</button>
            </form>
            <div className="additional">
              <h4>Select a text to display:</h4>
              <select
                onClick={(event) => {
                  console.log(event.target.value);
                  setButton(0);
                  setMessageFR(event.target.value.split(",")[0]);
                  setMessageEN(event.target.value.split(",")[1]);
                }}
                name=""
                id=""
              >
                {optionsTxt}
              </select>
            </div>
            <SearchBar
              prayer={prayer}
              setPrayer={setPrayer}
              setPageFR={setPageFR}
              setPageEN={setPageEN}
              setMessageFR={setMessageFR}
              setMessageEN={setMessageEN}
              setButton={setButton}
            />
          </div>
          <div className="right-panel">
            <div className="page-control">
              <FontAwesomeIcon
                icon="fa-solid fa-chevron-left"
                size="lg"
                style={{ color: "#621e06" }}
                onClick={() => {
                  const previousPrayer = data.find(
                    (p) => p.index === prayer.index - 1
                  );
                  if (previousPrayer) {
                    setPrayer(previousPrayer);
                    setPageFR(previousPrayer.fr.pageStart);
                    setPageEN(previousPrayer.en.pageStart);
                  }
                }}
              />
              <button
                onClick={() => {
                  setMessageFR("");
                  setMessageEN("");
                  setButton(0);
                  if (pageFR > pageMin) {
                    setPageFR(Number(pageFR) - 1);
                    setPageEN(
                      prayer.en.pageEnd -
                        Math.ceil(
                          (Math.abs(pageFR - prayer.fr.pageEnd) *
                            (prayer.en.pageEnd - prayer.en.pageStart)) /
                            (prayer.fr.pageEnd - prayer.fr.pageStart)
                        )
                    );
                  }
                  if (pageFR === prayer.fr.pageStart && prayer.index > 1) {
                    const previousPrayer = data.find(
                      (p) => p.index === prayer.index - 1
                    );
                    setPrayer(previousPrayer);
                    setPageFR(previousPrayer.fr.pageEnd);
                    setPageEN(previousPrayer.en.pageEnd);
                  }
                }}
              >
                -
              </button>
              <input
                value={pageFR}
                type="text"
                placeholder="Go to page:"
                onChange={(event) => {
                  setMessageFR("");
                  setMessageEN("");
                  setButton(0);

                  if (event.target.value < pageMaxFR) {
                    setPageFR(event.target.value);
                    const pp = data.find(
                      (p) => p.fr.pageEnd > event.target.value
                    );
                    if (pp) {
                      setPrayer(pp);
                      setPageEN(pp.en.pageStart);
                    }
                  } else {
                    setPageFR(pageMaxFR);
                    setPageEN(pageMaxEN);
                    setPrayer(data[indexLast - 1]);
                  }
                }}
              />
              <button
                onClick={() => {
                  setMessageFR("");
                  setMessageEN("");
                  setButton(0);

                  if (Number(pageFR) < pageMaxFR) {
                    setPageFR(Number(pageFR) + 1);
                    setPageEN(
                      prayer.en.pageStart +
                        Math.floor(
                          ((pageFR - prayer.fr.pageStart) *
                            (prayer.en.pageEnd - prayer.en.pageStart)) /
                            (prayer.fr.pageEnd - prayer.fr.pageStart)
                        )
                    );
                  } else {
                    setPageFR(pageMaxFR);
                    setPageEN(pageMaxEN);
                  }
                  if (
                    pageFR === prayer.fr.pageEnd &&
                    prayer.index < indexLast
                  ) {
                    const nextPrayer = data.find(
                      (p) => p.index === prayer.index + 1
                    );
                    setPrayer(nextPrayer);
                    setPageFR(nextPrayer.fr.pageStart);
                    setPageEN(nextPrayer.en.pageStart);
                  }
                }}
              >
                +
              </button>
              <FontAwesomeIcon
                icon="fa-solid fa-chevron-right"
                onClick={() => {
                  setMessageFR("");
                  setMessageEN("");
                  setButton(0);
                  const nextPrayer = data.find(
                    (p) => p.index === prayer.index + 1
                  );
                  if (nextPrayer) {
                    setPrayer(nextPrayer);
                    setPageFR(nextPrayer.fr.pageStart);
                    setPageEN(nextPrayer.en.pageStart);
                  }
                }}
                size="lg"
                style={{ color: "#621e06" }}
              />
            </div>
            <div className="repeat">
              <FontAwesomeIcon icon="fa-solid fa-repeat" />
              <button
                onClick={() => {
                  setPageFR(prayer.fr.pageStart);
                  setPageEN(prayer.en.pageStart);
                }}
              >
                Repeat
              </button>
            </div>
            <div className="buttons">
              <h3>Quick displays:</h3>
              <button
                style={{
                  backgroundColor: button === 1 ? "darkgray" : "lightgray",
                  color: button === 1 ? "white" : "black",
                }}
                onClick={() => myButtonFunc(1)}
              >
                Tea Break
              </button>
              <button
                style={{
                  backgroundColor: button === 2 ? "darkgray" : "lightgray",
                  color: button === 2 ? "white" : "black",
                }}
                onClick={() => myButtonFunc(2)}
              >
                Local Announcements
              </button>
              <button
                style={{
                  backgroundColor: button === 3 ? "darkgray" : "lightgray",
                  color: button === 3 ? "white" : "black",
                }}
                onClick={() => myButtonFunc(3)}
              >
                Resuming in 10min
              </button>
              <button
                style={{
                  backgroundColor: button === 4 ? "darkgray" : "lightgray",
                  color: button === 4 ? "white" : "black",
                }}
                onClick={() => myButtonFunc(4)}
              >
                Additional prayer
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
