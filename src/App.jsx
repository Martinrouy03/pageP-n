import { useState } from "react";
import "./App.scss";
import "./fonts.css";
import Header from "./assets/components/Header";
import SearchBar from "./assets/components/Searchbar";
import data from "./assets/material/data.json";

// console.log(data.French.prayers);
function App() {
  const indexLast = data.French.prayers.length;
  const pageMax = data.French.prayers[indexLast - 1].pageEnd;
  const [page, setPage] = useState(7);
  const [message, setMessage] = useState("");
  const [button, setButton] = useState(0);
  const [prayer, setPrayer] = useState(data.French.prayers[0]);
  const myButtonFunc = (buttonIndex) => {
    let msg = "";
    if (buttonIndex === 1) {
      msg = "🍵 TEA BREAK 🍵";
    } else if (buttonIndex === 2) {
      msg = "📣 Local Announcements 📣";
    } else if (buttonIndex === 3) {
      msg = "... Resuming in 10 minutes ...";
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
            <p>{prayer.title}</p>
            <div>
              <span>p.{page}</span>
            </div>
          </div>
        )}
        <div className="control-panel">
          <div className="left-panel">
            <h2>Control Panel</h2>
            <SearchBar
              prayer={prayer}
              setPrayer={setPrayer}
              setPage={setPage}
              setMessage={setMessage}
            />
          </div>
          <div className="right-panel">
            <div className="page-control">
              <button
                onClick={() => {
                  setMessage("");
                  if (page > 1) {
                    setPage(Number(page) - 1);
                  }
                  if (page === prayer.pageStart && prayer.index > 1) {
                    const previousPrayer = data.French.prayers.find(
                      (p) => p.index === prayer.index - 1
                    );
                    setPrayer(previousPrayer);
                    setPage(previousPrayer.pageEnd);
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
                  if (event.target.value < pageMax) {
                    setPage(event.target.value);
                    const pp = data.French.prayers.find(
                      (p) => p.pageEnd > event.target.value
                    );
                    if (pp) {
                      setPrayer(pp);
                    }
                  } else {
                    setPage(pageMax);
                    setPrayer(data.French.prayers[indexLast - 1]);
                  }
                }}
              />
              <button
                onClick={() => {
                  setMessage("");
                  if (Number(page) < pageMax) {
                    setPage(Number(page) + 1);
                  } else {
                    setPage(pageMax);
                  }
                  if (page === prayer.pageEnd && prayer.index < 38) {
                    const nextPrayer = data.French.prayers.find(
                      (p) => p.index === prayer.index + 1
                    );
                    setPrayer(nextPrayer);
                    setPage(nextPrayer.pageStart);
                  }
                }}
              >
                +
              </button>
            </div>
            <div className="buttons">
              <h3>Quick displays:</h3>
              <button onClick={() => myButtonFunc(1)}>Tea Break</button>
              <button onClick={() => myButtonFunc(2)}>
                Local Announcements
              </button>
              <button onClick={() => myButtonFunc(3)}>Resuming in 10min</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
