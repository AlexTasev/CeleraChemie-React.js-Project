import React from "react";

import "./Products.css";

const ProductSelector = (props) => {
  return (
    <div className="product-selector">
      <ul>
        <li>
          <button onClick={props.loadChemicals}>Chemicals</button>
        </li>
        <li>
          <button onClick={props.loadConsumables}>Consumables</button>
        </li>
        <li>
          <button onClick={props.loadInstruments}>Instruments</button>
        </li>
        <li>
          <button onClick={props.loadGlassware}>Glassware</button>
        </li>
        <li>
          <button onClick={props.loadFilters}>Filters</button>
        </li>
      </ul>
    </div>
  );
};

export default ProductSelector;
