import searchImg from "../../assets/Icons/search-24px.svg";
import deleteImg from "../../assets/Icons/delete_outline-24px.svg";
import editImg from "../../assets/Icons/edit-24px.svg";
import chevronRight from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";

import { Link } from "react-router-dom";
import "./InventoryList.scss";

function InventoryList() {
  return (
    <section className="card">
      <div className="card__bgBlue"></div>

      <div className="card__wrapper">
        <div className="card__header">
          <h1 className="card__header-title">Inventory</h1>
          <div className="card__container">
            <div className="card__searchBox">
              <input
                type="search"
                className="card__searchBox-input"
                id="searchBox"
                placeholder="Search..."
              />
              <img
                src={searchImg}
                alt={searchImg}
                className="card__searchBox-img"
              />
            </div>
            <div className="btn">
              <div className="btn__style-link">
                <button type="button" className="btn__style">
                  + Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-table">
          <div className="card-table__headings">
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Inventory Item</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Category</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Status</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Quantity</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Warehouse</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
          </div>
          <div className="card-table__heading-wrapper card-table__heading-wrapper--actions">
            <h4 className="card-table__heading">Actions</h4>
          </div>
        </div>

        <ul>
          {/* {inventoryList.map((inventory) => ( ))} */}
          <li className="card__list">
            <div className="card__list-content">
              <div className="card__list-content-left">
                <div className="card__list-wrap">
                  <h4 className=" card__list-title  ">Inventory Item</h4>
                  <Link to="/" className="card__product-item">
                    <p className="card__list-text-item card__list-text-item--product">
                      Television
                    </p>
                    <img
                      src={chevronRight}
                      alt={chevronRight}
                      className="card__product-item_chevron"
                    />
                  </Link>
                </div>
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Category</h4>
                  <p className="card__list-text-item">Eletronics</p>
                </div>
              </div>
              <div className="card__list-content-right">
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Status</h4>
                  <p className="card__list-text-item-inStock card__list-text-item-outStock">
                    In stock
                  </p>
                </div>
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Qty</h4>
                  <p className="card__list-text-item">500</p>
                </div>
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Warehouse</h4>
                  <p className="card__list-text-item">Manhattan</p>
                </div>
              </div>
            </div>
            <div className="card__list-actions">
              <img src={deleteImg} alt={deleteImg} className="deleteImg" />
              <img src={editImg} alt={editImg} className="editImg" />
            </div>
          </li>
          <li className="card__list">
            <div className="card__list-content">
              <div className="card__list-content-left">
                <div className="card__list-wrap">
                  <h4 className=" card__list-title  ">Inventory Item</h4>
                  <Link to="/" className="card__product-item">
                    <p className="card__list-text-item card__list-text-item--product">
                      Television
                    </p>

                    <img
                      src={chevronRight}
                      alt={chevronRight}
                      className="card__product-item_chevron"
                    />
                  </Link>
                </div>
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Category</h4>
                  <p className="card__list-text-item">Eletronics</p>
                </div>
              </div>
              <div className="card__list-content-right">
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Status</h4>
                  <p className="card__list-text-item-inStock card__list-text-item-outStock">
                    Outstock
                  </p>
                </div>
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Qty</h4>
                  <p className="card__list-text-item">500</p>
                </div>
                <div className="card__list-wrap">
                  <h4 className="card__list-title">Wareh</h4>
                  <p className="card__list-text-item">Manh</p>
                </div>
              </div>
            </div>
            <div className="card__list-actions">
              <img src={deleteImg} alt={deleteImg} className="deleteImg" />
              <img src={editImg} alt={editImg} className="editImg" />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default InventoryList;
