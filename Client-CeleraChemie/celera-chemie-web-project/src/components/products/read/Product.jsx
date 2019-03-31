import React from "react";
import "./Products.css";

const Product = props => {
  return (
    <div className="products-display">
      <div className="logoUrl">
        <img src={props.logoUrl} alt="logo" />
      </div>
      <div className="manufacturer">{props.manufacturer}</div>
      <div className="description">{props.description}</div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.catalogueUrl}
        className="buttonUser"
      >
        Download Catalogue
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.brandWebSite}
        className="buttonUser"
      >
        Visit Official Website
      </a>
    </div>
  );
};

export default Product;
