import React, { PureComponent } from "react";
import LocaleContext from './LocaleContext'

import en from "./en.json";
import bg from "./bg.json";
import ro from "./ro.json";
import gr from "./gr.json";

class Translate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      langs: {
        en,
        bg,
        ro,
        gr
      }
    };
  }
  render() {
    const { langs } = this.state;
    const { string } = this.props;
    return (
      <LocaleContext.Consumer>
        {value => langs[value][string]}
      </LocaleContext.Consumer>
    );
  }
}

export default Translate;
