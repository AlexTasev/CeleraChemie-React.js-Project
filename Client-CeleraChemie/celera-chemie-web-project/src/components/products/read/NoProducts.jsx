import React, { Component, Fragment } from "react";
import Translate from "../../../locales/Translate";

class NoProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/product/all")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products
        })
      );
  }

  render() {
    return (
      <Fragment>
        <h1>
          <Translate string={"products.all"} />
        </h1>
        <div>
          {this.state.products.map(product => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={this.state.brandWebSite}
            >
              <img src={product.logoUrl} alt="logo" />
            </a>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default NoProducts;
