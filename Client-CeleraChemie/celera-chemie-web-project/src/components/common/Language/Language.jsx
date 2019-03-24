import React, { Component } from "react";
import "./Language.css";

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    lang: "en"
  };

  render() {
    return (
      <section className="lang">
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/gb.png"
          alt="English"
        />

        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/bg.png"
          alt="Bulgarian"
        />
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/cy.png"
          alt="Greek"
        />
        <input
          type="image"
          src="http://flags.fmcdn.net/data/flags/w580/ro.png"
          alt="Romanian"
        />
      </section>
    );
  }
}

export default Language;
