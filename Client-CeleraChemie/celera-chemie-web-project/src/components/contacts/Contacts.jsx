import React from "react";
import Translate from "../../locales/Translate";
import "./Contacts.css";

const Contacts = props => {
  return (
    <div className="contact">
      <div className="contacts-general">
        <p>
          <Translate string={"contacts.companyName"} />
        </p>
        <p>
          <Translate string={"contacts.address"} />
        </p>
        <p>
          <Translate string={"contacts.phone"} />
        </p>
        <p>
          <Translate string={"contacts.email"} />
        </p>
      </div>
      <div className="contacts-persons">
        <p>
          <Translate string={"contacts.personOne.name"} />
        </p>
        <p>
          Mobile: 
          <Translate string={"contacts.personOne.phone"} />
        </p>
        <p>
          Email: 
          <Translate string={"contacts.personOne.email"} />
        </p>
        <p>
          <br/>
          <Translate string={"contacts.personTwo.name"} />
        </p>
        <p>
          Mobile: 
          <Translate string={"contacts.personTwo.phone"} />
        </p>
        <p>
          Email: 
          <Translate string={"contacts.personTwo.email"} />
        </p>
      </div>
    </div>
  );
};

export default Contacts;
