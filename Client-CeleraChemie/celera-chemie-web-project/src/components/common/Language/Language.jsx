import React, { Component } from "react";
import "./Language.css";

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    id: "en"
  };

  render() {
    return (
      <section className="lang">
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/gb.png"
          alt="English"
          id="en"
          onClick={this.props.changeLanguage}
        />
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/bg.png"
          alt="Bulgarian"
          id="bg"
          onClick={this.props.changeLanguage}
        />
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/cy.png"
          alt="Greek"
          id="gr"
          onClick={this.props.changeLanguage}
        />
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/ro.png"
          alt="Romanian"
          id="ro"
          onClick={this.props.changeLanguage}
        />
      </section>
    );
  }
}

export default Language;
