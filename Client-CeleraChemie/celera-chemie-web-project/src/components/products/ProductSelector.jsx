import React from "react";
import "./Products.css";

const ProductSelector = props => {
  return (
    <section className="product-selector">
      <ul>
        <li>Chemicals</li>
        <li>Consumables</li>
        <li>Instruments</li>
        <li>Glassware</li>
        <li>Filters</li>
      </ul>
    </section>
  );
};

export default ProductSelector;
