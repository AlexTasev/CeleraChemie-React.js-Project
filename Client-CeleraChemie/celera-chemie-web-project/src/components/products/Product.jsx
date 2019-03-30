import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const Product = props => {
  return (
    <section className="products-display">
      <div className="logoUrl">
        <img src={props.logoUrl} alt="logo" />
      </div>
      <div className="manufacturer">{props.manufacturer}</div>
      <div className="description">{props.description}</div>
      <Link to={props.catalogueUrl} className="catalogueUrl">
        Download Catalogue
      </Link>
      <Link to={props.brandWebSite} className="brandWebSite">
        Visit Official Website
      </Link>
    </section>
  );
};

export default Product;
