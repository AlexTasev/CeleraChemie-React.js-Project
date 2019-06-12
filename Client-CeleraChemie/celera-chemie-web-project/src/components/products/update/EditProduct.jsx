import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../common/Input";
import { get, put } from "../../../data/crud"
import { createProductValidationFunc } from "../../../utils/formValidator";
import createProductValidator from "../../../utils/createProductValidator";
import "../../common/Form.css";

class EditProduct extends Component {
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
      productEdited: false
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

  async onSubmit(e) {
    e.preventDefault();
    const productId = this.props.match.params.id;
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
        category.toLowerCase(),
        language.toLowerCase(),
        logoUrl,
        catalogueUrl,
        brandWebSite
      )
    ) {
      return;
    }

    await put(`product/${productId}`,
      {
        manufacturer: this.state.manufacturer,
        description: this.state.description,
        category: this.state.category.toLowerCase(),
        language: this.state.language.toLowerCase(),
        logoUrl: this.state.logoUrl,
        catalogueUrl: this.state.catalogueUrl,
        brandWebSite: this.state.brandWebSite
      }
    ).then(res => {
      if (res.errors) {
        toast.error(res.errors);
      } else {
        toast.success("Product edited successfully!");
        this.setState({ productEdited: true });
      }
    })
  };


  componentDidMount() {
    const productId = this.props.match.params.id;
    get(`product/${productId}`)
      .then(product =>
        this.setState({
          _id: productId,
          manufacturer: product.manufacturer,
          description: product.description,
          category: product.category,
          logoUrl: product.logoUrl,
          language: product.language,
          catalogueUrl: product.catalogueUrl,
          brandWebSite: product.brandWebSite
        })
      );
  }

  render() {
    if (!this.props.isAdmin) {
      return <Redirect to="/login" />;
    }

    if (this.state.productEdited) {
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
      <section className="form">
        <h1>Edit Product</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            type="text"
            name="manufacturer"
            label="Manufacturer"
            placeholder={this.state.manufacturer}
            value={this.state.manufacturer}
            onChange={this.onChange}
            valid={validObj.validManufacturer}
          />
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            placeholder={this.state.description}
            value={this.state.description}
            onChange={this.onChange}
          />
          <Input
            type="text"
            name="category"
            label="Category"
            placeholder={this.state.category}
            value={this.state.category}
            onChange={this.onChange}
            valid={validObj.validCategory}
          />
          <Input
            type="text"
            name="language"
            label="Language"
            placeholder={this.state.language}
            value={this.state.language}
            onChange={this.onChange}
            valid={validObj.validLanguage}
          />
          <Input
            type="text"
            name="logoUrl"
            label="Logo URL"
            placeholder={this.state.logoUrl}
            value={this.state.logoUrl}
            onChange={this.onChange}
            valid={validObj.validLogoUrl}
          />
          <Input
            type="text"
            name="catalogueUrl"
            label="Catalogue URL"
            placeholder={this.state.catalogueUrl}
            value={this.state.catalogueUrl}
            onChange={this.onChange}
            valid={validObj.validCatalogueUrl}
          />
          <Input
            type="text"
            name="brandWebSite"
            label="Manufacturer web site"
            placeholder={this.state.brandWebSite}
            value={this.state.brandWebSite}
            onChange={this.onChange}
            valid={validObj.validBrandUrl}
          />
          <input type="submit" value="Edit Product" />
        </form>
      </section>
    );
  }
}

export default EditProduct;
