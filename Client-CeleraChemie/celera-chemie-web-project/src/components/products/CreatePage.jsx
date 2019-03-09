import React, { Component, Fragment } from "react";
import { toast } from "react-toastify";

import { createProductValidationFunc } from "../../utils/formValidator";
import createProductValidator from "../../utils/createProductValidator";
import Input from '../common/Input'
import "./Form.css";

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

    let data = (this.state.manufacturer,
    this.state.description,
    this.state.category,
    this.state.logoUrl,
    this.state.language,
    this.state.catalogueUrl,
    this.state.brandWebSite);

    if (!createProductValidator(data)) {
      return;
    }
    this.props.createProduct(data);
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
            type='text'
            name='manufacturer'
            label='Manufacturer'
            placeholder='Enter manufacturer name'
            value={this.state.manufacturer}
            onChange={this.onChange}
            valid={validObj.validManufacturer}
          />
          <label>Description</label>
          <textarea
            type='text'
            name='description'
            placeholder='Product description'
            value={this.state.description}
            onChange={this.onChange}
            valid={validObj.validDescription}
          />
          <label>
            Category
          <select value={this.state.value} onChange={this.onChange}>
              <option value="chemicals">Chemicals</option>
              <option value="consumables">Consumables</option>
              <option value="instruments">Instruments</option>
              <option value="glassware">Glassware</option>
              <option value="filters">Filters</option>
            </select>
          </label>
          <Input
            type='text'
            name='logoUrl'
            label='Logo URL'
            placeholder='Enter manufacturer logo'
            value={this.state.logoUrl}
            onChange={this.onChange}
            valid={validObj.validLogoUrl}
          />
          <label>
            Language
          <select value={this.state.value} onChange={this.onChange}>
              <option value="en">English</option>
              <option value="bg">Bulgarian</option>
              <option value="ro">Romanian</option>
              <option value="gr">Greek</option>
            </select>
          </label>
          <Input
            type='text'
            name='catalogueUrl'
            label='Catalogue URL'
            placeholder='Enter link to catalogue'
            value={this.state.catalogueUrl}
            onChange={this.onChange}
            valid={validObj.validCatalogueUrl}
          />
          <Input
            type='text'
            name='brandWebSite'
            label='Manufacturer web site'
            placeholder='Enter manufacturer web site'
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
