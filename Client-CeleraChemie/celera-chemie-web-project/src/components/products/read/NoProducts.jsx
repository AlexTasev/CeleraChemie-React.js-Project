import React, { Component } from "react";

import { get } from "../../../data/crud"
import "./Products.css";

class NoProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  async componentDidMount() {
    let products = await get(`http://localhost:5000/product/all/${this.props.language}`)
    this.setState({
      products
    })
  }

  render() {
    return (
      <section className="all-products-display">
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
      </section>
    );
  }
}

export default NoProducts;
