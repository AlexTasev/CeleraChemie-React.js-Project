import React, { Component } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import Auth from "../../../utils/auth";
import { createProductValidationFunc } from "../../../utils/formValidator";
import createProductValidator from "../../../utils/createProductValidator";
import Input from "../../common/Input";
import "../../common/Form.css";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: "",
      description: "",
      category: "",
      logoUrl: "",
      language: "",
      catalogueUrl: "",
      brandWebSite: "",
      productCreated: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    this.setState({
      [targetName]: targetValue
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let {
      manufacturer,
      description,
      category,
      logoUrl,
      language,
      catalogueUrl,
      brandWebSite
    } = this.state;
    if (
      !createProductValidator(
        manufacturer,
        description,
        category,
        logoUrl,
        language,
        catalogueUrl,
        brandWebSite
      )
    ) {
      return;
    }

    fetch("http://localhost:5000/product/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + Auth.getToken()
      },
      body: JSON.stringify({
        manufacturer: this.state.manufacturer,
        description: this.state.description,
        category: this.state.category,
        logoUrl: this.state.logoUrl,
        language: this.state.language,
        catalogueUrl: this.state.catalogueUrl,
        brandWebSite: this.state.brandWebSite
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Product created!");
          this.setState({ productCreated: true });
        }
      });
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/login" />;
    }

    if (this.state.productCreated) {
      return <Redirect to="/products" />;
    }

    let validObj = createProductValidationFunc(
      this.state.manufacturer,
      this.state.description,
      this.state.category,
      this.state.logoUrl,
      this.state.language,
      this.state.catalogueUrl,
      this.state.brandWebSite
    );

    return (
      <div
        className="Form"
        style={{
          backgroundImage: `url("https://am3pap003files.storage.live.com/y4pEGvAr2dl_1V7s4OWdBCtWCTkW7fHBg4HkLf1Klm_o8AJFqRflYkoomqEmwhGLPuRHpDNtRQ8B8k58DRAa3avlTjH6PhW22xmAYLKqvY__kCcHdGadI4zAsiv6crc25tD8RJC2iL48C9rHGExK5hUmvmppGtr176yFZ6BlN_-Tyh490zfb5aWCCt6hnz1OHLd/Products-all.jpg?psid=1&width=1000&height=535")`
        }}
      >
        <h1>Create Product</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="manufacturer"
            label="Manufacturer"
            placeholder="Enter manufacturer name"
            value={this.state.manufacturer}
            onChange={this.onChange}
            valid={validObj.validManufacturer}
          />
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            placeholder="Product description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <Input
            type="text"
            name="category"
            label="Category"
            placeholder="Enter product category, example: filters"
            value={this.state.category}
            onChange={this.onChange}
            valid={validObj.validCategory}
          />
          <Input
            type="text"
            name="language"
            label="Language"
            placeholder="Enter language, example: en, bg, ro, gr"
            value={this.state.language}
            onChange={this.onChange}
            valid={validObj.validLanguage}
          />
          <Input
            type="text"
            name="logoUrl"
            label="Logo URL"
            placeholder="Enter manufacturer logo"
            value={this.state.logoUrl}
            onChange={this.onChange}
            valid={validObj.validLogoUrl}
          />
          <Input
            type="text"
            name="catalogueUrl"
            label="Catalogue URL"
            placeholder="Enter link to catalogue"
            value={this.state.catalogueUrl}
            onChange={this.onChange}
            valid={validObj.validCatalogueUrl}
          />
          <Input
            type="text"
            name="brandWebSite"
            label="Manufacturer web site"
            placeholder="Enter manufacturer web site"
            value={this.state.brandWebSite}
            onChange={this.onChange}
            valid={validObj.validBrandUrl}
          />
          <input type="submit" value="Create Product" />
        </form>
      </div>
    );
  }
}

export default CreatePage;
