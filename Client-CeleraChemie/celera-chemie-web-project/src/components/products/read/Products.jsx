import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Auth from "../../../utils/auth";
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
      `http://localhost:5000/product/${chosenCategory}/${this.state.language}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + Auth.getToken()
        }
      }
    )
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products: products,
          category: chosenCategory
        })
      );
  }

  getBackground() {
    if (this.state.category === "instruments") {
      return "https://am3pap003files.storage.live.com/y4pPYJMlQSUBXtZexCYflN1v9VH345zRuc2HxZWOAn7q-yUjyl4P0a9MRG2bN1lPTO9Ts5249-WhsCcOlvRVt4ff7vFvygrAQFbf_X6x_jnsc8p29sjmeUSoq7qRMyb6y8ss5is48Ldo_3KRNWGyvTe7kJfuvUfgP9C5WXmFoy1DF44cFspokwShaTZa0naf9Rc/Instruments.png?psid=1&width=967&height=788";
    } else if (this.state.category === "filters") {
      return "https://am3pap003files.storage.live.com/y4pEo7epzXxnVg-XRnEZ3Rw8lNSKOPv3fFo1cX9XzAQNE1j2iw8TJ5VZNq6Og7UUxnGmtu1-h3xm_8Re5WzQBtgiW16YcXOpC9gbuGy5FhzfSUJPiQD6yO8Wd-7QwPrs19np4LaXjRWIRncCwb4FtoR2-xXw9SvePm9DXl7wUo8fCe2LNcS7hn85iEPYiciqOc3/Filters.png?psid=1&width=1131&height=849";
    } else if (this.state.category === "chemicals") {
      return "https://am3pap003files.storage.live.com/y4pMcaZxZJM81kBw8qBLvGN3XvDydbvnKWdo79dcAd3RKyWAYRBIZBU83NmwhdpBu3tHT51CvcMC3GMHTUgy7Bl7QkvhNFRc3vkxtsW9BLdR22tTrLsirNu5PwBLPdWiC-xjcrEM5EEqmRIThYtuiRci0zmR57irF2SjXI9DEWAFi16r2Bav-vIuYFA-Oa9-hfX/Chemicals.png?psid=1&width=1533&height=765";
    } else if (this.state.category === "glassware") {
      return "https://am3pap003files.storage.live.com/y4pSmhmlu0RO3P_3IW1IE8OBkRbSIorKAM2CFTq9UAWfBFAvlDYgfv9-SYj4nAi5vsKW7xWJOByJs2d-o3mZg65QwWpiM2Cj2yvXe76s7e3y8eLsYbnhY6OVRzipbF2z7kB1btkikRoi51Z_LeNj1gNArD3chypSI_7X46TZpENnmdG0wK7qMLm1kWvXVzwe7_v/Glass.png?psid=1&width=1170&height=710";
    } else if (this.state.category === "consumables") {
      return "https://am3pap003files.storage.live.com/y4pbFhfWS7yz8eOS6CsMlSZpwrgwihLvXCgoGKE7rwUDjy1fTRTlsz8mGm3MbfnaxmGc8bPkQwgxRYR2rPpMbyjsv7nSFYQYS-w510PFkBAL0Cvb6azup9eahQ1CzPz2klAa8vH29EmRGYfASZizk964UqeAf60BdVTGZs955xsLzj20bdbkaOiUvSzYEmCJne5/Consumables.png?psid=1&width=1280&height=812";
    } else {
      return "https://am3pap003files.storage.live.com/y4p4LnPussbqWK1voC8nwOcAQAyBGWToFrM4-HJd87FiHIZ9zhuUwumBYK_vGuzOeWJXcxyHq29niMbdT3kzkIz8A91p2zMg6j-Lf2MxEWgh648DoZZN9i3QsExTmThRMx1FkVgThjQfBrG-K8CSBn69LCxUFCrz6HsFWXu18A122IVKsr0W_QuUznoeXugb7fn/Products.png?psid=1&width=1274&height=849";
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <section
        className="products-section"
        style={{ backgroundImage: `url(${this.getBackground()})` }}
      >
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
