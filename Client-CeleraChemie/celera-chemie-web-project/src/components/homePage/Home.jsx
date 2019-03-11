import React, { Component } from "react";

import "../homePage/Home.css";
import logo from "../../Resources/images/Celera-logo.png";

import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import ProductSelector from "../products/ProductSelector";

class HomePage extends Component {
  render() {
    return (
      <section className="banner-image">
        <div className="commercial-text-box">
            <br />
          <img src={logo} alt='Celera-Chemie'/>
          <h6>
            Your trusted parthner for laboratory<br/>
          </h6>
          <ProductSelector/>
          {/* <h4>Chemicals</h4>
          <h4>Consumables</h4>
          <h4>Instruments</h4>
          <h4>Filters</h4> */}
        </div>
      </section>
    );
  }
}

export default HomePage;
