import React, { Component, Fragment } from "react";
import toast from 'react-toastify;'

import createProductValidator from '../../utils/createProductValidator'
import "./Products.css";

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
    this.props.createProduct(
        this.state.manufacturer,
        this.state.description,
        this.state.category,
        this.state.logoUrl,
        this.state.language,
        this.state.catalogueUrl,
        this.state.brandWebSite
    );
  }

  render() {
    let validObj = createProductValidationFunc(
      this.state.name,
      this.state.ingredients,
      this.state.description,
      this.state.image,
      this.state.weight,
      this.state.price
    );

    return (
      <div>CreateForm</div>
    );
  }
}

export default CreatePage;
