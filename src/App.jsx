import { useState } from "react";
import "./App.scss";
import "./fonts.css";
import Header from "./assets/components/Header";
import SearchBar from "./assets/components/Searchbar";
import data from "./assets/material/data.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
library.add(faRepeat);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// console.log(data);
function App() {
  const welcomeMessage =
    "Welcome all! || French edition: 2022 || English edition:20XX";
  const indexLast = data.length;
  const pageMax = data[indexLast - 1].fr.pageEnd;
  const [page, setPage] = useState(7);
  const [message, setMessage] = useState(welcomeMessage);
  const [button, setButton] = useState(0);
  const [prayer, setPrayer] = useState(data[0]);
  const myButtonFunc = (buttonIndex) => {
    let msg = "";
    if (buttonIndex === 1) {
      msg = "🍵 TEA BREAK 🍵";
    } else if (buttonIndex === 2) {
      msg = "📣 Local Announcements 📣";
    } else if (buttonIndex === 3) {
      msg = "... Resuming in 10 minutes ...";
    } else if (buttonIndex === 4) {
      msg = "📜 Additional prayer (not in the book) 📜";
    }
    if (message && button === buttonIndex) {
      setMessage("");
      setButton(0);
    } else {
      setMessage(msg);
      setButton(buttonIndex);
    }
  };
  return (
    <>
      <Header />

      <main className="container">
        {message ? (
          <div className="display-container">
            <p>{message}</p>
          </div>
        ) : (
          <div className="display-container display-prayer">
            <p>{prayer.fr.title}</p>
            <div>
              <span>p.{page}</span>
            </div>
          </div>
        )}
        <div className="control-panel">
          <div className="left-panel">
            <h2>Control Panel</h2>
            <button
              onClick={() => {
                setMessage(welcomeMessage);
                setButton(0);
              }}
            >
              Welcome
            </button>
            <button
              onClick={() => {
                setMessage("");
                setButton(0);
                setPrayer(data[0]);
                setPage(7);
              }}
            >
              START
            </button>
            <button
              onClick={() => {
                setMessage("");
                setButton(0);
                const SamantabhadraPrayer = data.find((p) =>
                  p.fr.title.includes("Samantabhadra")
                );
                setPrayer(SamantabhadraPrayer);
                setPage(SamantabhadraPrayer.fr.pageStart);
              }}
            >
              Samantabhadra Prayer
            </button>
            <SearchBar
              prayer={prayer}
              setPrayer={setPrayer}
              setPage={setPage}
              setMessage={setMessage}
              setButton={setButton}
            />
          </div>
          <div className="right-panel">
            <div className="page-control">
              <button
                onClick={() => {
                  setMessage("");
                  setButton(0);
                  if (page > 1) {
                    setPage(Number(page) - 1);
                  }
                  if (page === prayer.fr.pageStart && prayer.index > 1) {
                    const previousPrayer = data.find(
                      (p) => p.index === prayer.index - 1
                    );
                    setPrayer(previousPrayer);
                    setPage(previousPrayer.fr.pageEnd);
                  }
                }}
              >
                -
              </button>
              <input
                value={page}
                type="text"
                placeholder="Go to page:"
                onChange={(event) => {
                  setMessage("");
                  setButton(0);

                  if (event.target.value < pageMax) {
                    setPage(event.target.value);
                    const pp = data.find(
                      (p) => p.fr.pageEnd > event.target.value
                    );
                    if (pp) {
                      setPrayer(pp);
                    }
                  } else {
                    setPage(pageMax);
                    setPrayer(data[indexLast - 1]);
                  }
                }}
              />
              <button
                onClick={() => {
                  setMessage("");
                  setButton(0);

                  if (Number(page) < pageMax) {
                    setPage(Number(page) + 1);
                  } else {
                    setPage(pageMax);
                  }
                  if (page === prayer.fr.pageEnd && prayer.index < 38) {
                    const nextPrayer = data.find(
                      (p) => p.index === prayer.index + 1
                    );
                    setPrayer(nextPrayer);
                    setPage(nextPrayer.fr.pageStart);
                  }
                }}
              >
                +
              </button>
            </div>
            <div className="repeat">
              <FontAwesomeIcon icon="fa-solid fa-repeat" />
              <button
                onClick={() => {
                  setPage(prayer.fr.pageStart);
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
