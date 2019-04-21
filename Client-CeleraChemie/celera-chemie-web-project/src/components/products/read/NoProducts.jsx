import React from "react";
import Translate from "../../../locales/Translate";

class NoProducts extends React.Component {
  constructor(props) {
    super(props);
    

  }
  componentDidMount() {
    fetch("http://localhost:5000/product")
      .then(rawData => rawData.json())
      .then(products =>
        this.setState({
          products
        })
      );
  }

  render() {
    return (
      <h1>
        <Translate string={"products.all"} />
      </h1>
    );
  }
}

export default NoProducts;
