import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import "./Header.scss";

function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  console.log(location);

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <img src={logo} alt={logo} className="header__logo-img" />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__nav-item-style ${
                  activeLink === "/" ||
                  activeLink === "/warehouses/add" ||
                  activeLink === "/warehouses/edit"
                    ? "header__nav-item-style--active-link"
                    : ""
                }`}
              >
                Warehouses
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/inventory"
                className={`header__nav-item-style ${
                  activeLink === "/inventory"
                    ? "header__nav-item-style--active-link"
                    : ""
                }`}
              >
                Inventory
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
