import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Auth from "../../../utils/auth";
import "./Products.css";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      isProductDeleted: false
    };

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct() {
    const productId = this.props.id;
    if (this.props.isAdmin) {
      fetch(`http://localhost:5000/product/delete/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + Auth.getToken()
        }
      }).then(res => {
        toast.success("Product deleted successfuly");
      })
    }
  }

  render() {
    return (
      <div className="products-display">
        <div className="logoUrl">
          <img src={this.props.logoUrl} alt="logo" />
        </div>
        <div className="manufacturer">{this.props.manufacturer}</div>
        <div className="description">{this.props.description}</div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={this.props.catalogueUrl}
          className="button-user"
        >
          Download Catalogue
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={this.props.brandWebSite}
          className="button-user"
        >
          Visit Official Website
        </a>
        {this.props.isAdmin && (
          <Fragment>
            <Link
              className="button-user"
              id="edit-btn"
              to={`/product/edit/${this.props.id}`}
            >
              Edit Product
            </Link>
            <button
              onClick={this.deleteProduct}
              className="button-user"
              id="delete-btn"
            >
              Delete Product
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Product;
