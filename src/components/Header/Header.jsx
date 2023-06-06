import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <img src={logo} alt={logo} className="header__logo-img" />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <button
                type="button"
                className="header__nav-item-style header__nav-item-style--active-link"
                onClick={() => navigate("/warehouses")}
              >
                Warehouses
              </button>
            </li>
            <li className="header__nav-item">
              <button
                type="button"
                className="header__nav-item-style"
                onClick={() => navigate("/inventory")}
              >
                Inventory
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
