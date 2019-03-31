import React, { Component } from "react";
import Product from "./Product";

import "./Products.css";
import ProductSelector from "./ProductSelector";
import NoProducts from "./NoProducts";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
      language: "en",
      products: []
    };
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

  loadConsumables() {
    fetch("http://localhost:5000/product/consumables")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products,
          category: "consumables"
        })
      );
  }

  loadInstruments() {
    fetch("http://localhost:5000/product/instruments")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products,
          category: "instruments"
        })
      );
  }

  loadGlassware() {
    fetch("http://localhost:5000/product/glassware")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products,
          category: "glassware"
        })
      );
  }

  loadFilters() {
    fetch("http://localhost:5000/product/filters")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products,
          category: "filters"
        })
      );
  }

  render() {
    return (
      <section className="products-section">
        <ProductSelector
          loadChemicals={this.loadChemicals.bind(this)}
          loadConsumables={this.loadConsumables.bind(this)}
          loadInstruments={this.loadInstruments.bind(this)}
          loadGlassware={this.loadGlassware.bind(this)}
          loadFilters={this.loadFilters.bind(this)}
        />
        {!this.state.category && (
          <NoProducts/>
        )}
        {this.state.products.map(product => (
          <Product
            key={product._id}
            logoUrl={product.logoUrl}
            manufacturer={product.manufacturer}
            description={product.description}
            catalogueUrl={product.catalogueUrl}
            brandWebSite={product.brandWebSite}
            id={product._id}
            isAdmin={this.props.isAdmin}
          />
        ))}
      </section>
    );
  }
}

export default Products;
