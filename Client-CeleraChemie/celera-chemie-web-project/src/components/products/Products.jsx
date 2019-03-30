import React, { Component, Fragment } from "react";
import Product from "./Product";

import "./Products.css";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "chemicals",
      language: "en",
      products: []
    };

    this.loadChemicals = this.loadChemicals.bind(this);
    this.loadFilters = this.loadFilters.bind(this);
  }

  loadChemicals() {
    fetch("http://localhost:5000/product/chemicals")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products: products,
          category: "chemicals"
        })
      );
  }

  loadFilters() {
    fetch("http://localhost:5000/product/filters")
      .then(rawData => rawData.json())
        .then(products =>
        this.setState({
          products: products,
          category: "filters"
        })
      );
  }

  render() {
    return (
      <Fragment>
        <section className="products-section">
          <section className="product-selector">
            <ul>
              <li>
                <button onClick={this.loadChemicals}>Chemicals</button>
              </li>
              <li>
                <button>Consumables</button>
              </li>
              <li>
                <button>Instruments</button>
              </li>
              <li>
                <button>Glassware</button>
              </li>
              <li>
                <button onClick={this.loadFilters}>Filters</button>
              </li>
            </ul>
          </section>
        </section>
        {this.state.products.map(product => (
          <Product
            logoUrl={product.logoUrl}
            manufacturer={product.manufacturer}
            description={product.description}
            catalogueUrl={product.catalogueUrl}
            brandWebSite= {product.brandWebSite}
          />
        ))}
      </Fragment>
    );
  }
}

export default Products;
