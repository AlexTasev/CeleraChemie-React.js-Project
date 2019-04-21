import React from "react";
import Translate from "../../locales/Translate";
import "./Certificates.css";

const Certificates = props => {
  let imgSrc;
  let pdfLocation;

  if (props.preferredLocale === "en") {
    imgSrc =
      "http://celera-chemie.com/test/wp-content/uploads/2019/02/ISO9001-BG-EN.jpg";
    pdfLocation =
      "http://celera-chemie.com/bg/wp-content/uploads/2019/02/ISO9001-EN.pdf";
  } else if (props.preferredLocale === "bg") {
    imgSrc =
      "http://celera-chemie.com/test/wp-content/uploads/2019/02/ISO9001-BG.jpg";
    pdfLocation =
      "http://celera-chemie.com/bg/wp-content/uploads/2019/02/ISO9001-BG.pdf";
  }

  return (
    <div className="certificates-page">
      <h1>
        <Translate string={"certificates.title"} />
      </h1>
      <p>
        <Translate string={"certificates.content"} />
      </p>
      <a href={pdfLocation} target="_blank" rel="noopener noreferrer">
        <img className="imgCertificate" src={imgSrc} alt="certificate" />
      </a>
    </div>
  );
};

export default Certificates;
