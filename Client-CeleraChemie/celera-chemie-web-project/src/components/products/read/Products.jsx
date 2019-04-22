import React, { Component, Fragment } from "react";
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

  getBackground() {
    if (this.state.category === "instruments") {
      return "https://am3pap003files.storage.live.com/y4pPYJMlQSUBXtZexCYflN1v9VH345zRuc2HxZWOAn7q-yUjyl4P0a9MRG2bN1lPTO9Ts5249-WhsCcOlvRVt4ff7vFvygrAQFbf_X6x_jnsc8p29sjmeUSoq7qRMyb6y8ss5is48Ldo_3KRNWGyvTe7kJfuvUfgP9C5WXmFoy1DF44cFspokwShaTZa0naf9Rc/Instruments.png?psid=1&width=967&height=788";
    } else if (this.state.category === "filters") {
      return "https://am3pap003files.storage.live.com/y4pEo7epzXxnVg-XRnEZ3Rw8lNSKOPv3fFo1cX9XzAQNE1j2iw8TJ5VZNq6Og7UUxnGmtu1-h3xm_8Re5WzQBtgiW16YcXOpC9gbuGy5FhzfSUJPiQD6yO8Wd-7QwPrs19np4LaXjRWIRncCwb4FtoR2-xXw9SvePm9DXl7wUo8fCe2LNcS7hn85iEPYiciqOc3/Filters.png?psid=1&width=1131&height=849";
    } else if (this.state.category === "chemicals") {
      return "https://am3pap003files.storage.live.com/y4pMcaZxZJM81kBw8qBLvGN3XvDydbvnKWdo79dcAd3RKyWAYRBIZBU83NmwhdpBu3tHT51CvcMC3GMHTUgy7Bl7QkvhNFRc3vkxtsW9BLdR22tTrLsirNu5PwBLPdWiC-xjcrEM5EEqmRIThYtuiRci0zmR57irF2SjXI9DEWAFi16r2Bav-vIuYFA-Oa9-hfX/Chemicals.png?psid=1&width=1533&height=765";
    } else if (this.state.category === "glassware") {
      return "https://am3pap003files.storage.live.com/y4pn-ONZayfKdNmHLYhGuu7ng6jJpNmjq1PHcIUMiSqRDBblHaw4Ryn_JAN7WccZG3aLZd37vp26fdPLyH65vTjSesuMt_gIaw5CVA6xELwQSfn5h6bCSV7s2O5sXsxyL_9XG_hfm1rwoeHrIYYulS0jewjoF1PyQbUaxtWbKTos2A-eIJMjwlVV7RqPyi14MBN/Glass.png?psid=1&width=788&height=788&cropMode=center";
    } else if (this.state.category === "consumables") {
      return "https://am3pap003files.storage.live.com/y4pbFhfWS7yz8eOS6CsMlSZpwrgwihLvXCgoGKE7rwUDjy1fTRTlsz8mGm3MbfnaxmGc8bPkQwgxRYR2rPpMbyjsv7nSFYQYS-w510PFkBAL0Cvb6azup9eahQ1CzPz2klAa8vH29EmRGYfASZizk964UqeAf60BdVTGZs955xsLzj20bdbkaOiUvSzYEmCJne5/Consumables.png?psid=1&width=374&height=237";
    }
    
  }

  render() {
    // if (!this.props.loggedIn) {
    //   return <Redirect to="/login" />;
    // }

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
