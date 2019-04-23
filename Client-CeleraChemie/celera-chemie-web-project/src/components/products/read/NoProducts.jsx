import React, { Component } from "react";

import Auth from "../../../utils/auth";
import "./Products.css";

class NoProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/product/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth.getToken()
      }
    })
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products
        })
      );
  }

  render() {
    return (
      <div className="all-products-display">
        {this.state.products.map(product => (
          <a
            className="brand-logo-url"
            target="_blank"
            rel="noopener noreferrer"
            key={product.id}
            href={product.brandWebSite}
          >
            <img src={product.logoUrl} alt="logo" />
          </a>
        ))}
      </div>
    );
  }
}

export default NoProducts;
