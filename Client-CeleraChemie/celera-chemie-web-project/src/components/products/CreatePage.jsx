import React, { Component } from "react";
import Redirect from "react-dom";

import { createProductValidationFunc } from "../../utils/formValidator";
import createProductValidator from "../../utils/createProductValidator";
import Input from "../common/Input";
import "../user/Form.css";

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
      brandWebSite: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      !createProductValidator(
        this.state.manufacturer,
        this.state.description,
        this.state.category,
        this.state.logoUrl,
        this.state.language,
        this.state.catalogueUrl,
        this.state.brandWebSite
      )
    ) {
      return;
    }
    this.props.createProduct({
      manufacturer: this.state.manufacturer,
      description: this.state.description,
      category: this.state.category,
      logoUrl: this.state.logoUrl,
      language: this.state.language,
      catalogueUrl: this.state.catalogueUrl,
      brandWebSite: this.state.brandWebSite
    });
  }

  componentDidMount() {
    if (!Auth.isUserAdmin()) {
      this.props.history.push("/");
    }
  }

  render() {
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
      <div className="Form">
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
          <input type="submit" value="Crreate Product" />
        </form>
      </div>
    );
  }
}

export default CreatePage;
