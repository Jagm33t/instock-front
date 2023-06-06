import { Link, useNavigate } from "react-router-dom";
import { useState, useParams } from "react";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(0);
  // const params = useParams();

  // create useState for the active links
  // create a click event handle for changing the acive link
  // create a use params to read the url path and extract data from it to change the actvie link

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <img src={logo} alt={logo} className="header__logo-img" />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/">
                <button
                  type="button"
                  className="header__nav-item-style header__nav-item-style--active-link"
                >
                  Warehouses
                </button>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/inventory">
                <button type="button" className="header__nav-item-style">
                  Inventory
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
