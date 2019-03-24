import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const ProductSelector = (props) => {
  return (
    <section className="product-selector">
      <ul>
        <li>
          <Link to="product/chemicals">Chemicals</Link>
        </li>
        <li>
          <Link to="product/consumables">Consumables</Link>
        </li>
        <li>
          <Link to="product/instruments">Instruments</Link>
        </li>
        <li>
          <Link to="product/glassware">Glassware</Link>
        </li>
        <li>
          <Link to="product/filters">Filters</Link>
        </li>
      </ul>
    </section>
  );
};

export default ProductSelector;
