import gk from "../img/karmapa_official.jpg";
import ksr from "../img/shamarpa_official_centered.jpg";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={gk} alt="" />
        <h1>Kagyu Mönlam</h1>
        <img src={ksr} alt="" />
      </div>
    </header>
  );
};
export default Header;
