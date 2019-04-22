import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Translate from "../../../locales/Translate";
import Product from "./Product";
import "./Products.css";
import NoProducts from "./NoProducts";

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      language: "",
      products: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.preferredLocale !== prevState.language) {
      return { language: nextProps.preferredLocale };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.preferredLocale !== this.props.preferredLocale) {
      this.setState({ language: this.props.preferredLocale });
    }
  }

  handleClick(e) {
    let chosenCategory = e.target.name;


    fetch(
      `http://localhost:5000/product/${chosenCategory}/${this.state.language}`
    )
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products: products,
          category: chosenCategory
        })
      );
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <section className="products-section">
        <div className="product-selector">
          <ul>
            <li>
              <button name="chemicals" onClick={this.handleClick}>
                <Translate string={"products.chemicals"} />
              </button>
            </li>
            <li>
              <button name="consumables" onClick={this.handleClick}>
                <Translate string={"products.consumables"} />
              </button>
            </li>
            <li>
              <button name="instruments" onClick={this.handleClick}>
                <Translate string={"products.instruments"} />
              </button>
            </li>
            <li>
              <button name="glassware" onClick={this.handleClick}>
                <Translate string={"products.glassware"} />
              </button>
            </li>
            <li>
              <button name="filters" onClick={this.handleClick}>
                <Translate string={"products.filters"} />
              </button>
            </li>
          </ul>
        </div>
        {!this.state.category && <NoProducts />}
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
