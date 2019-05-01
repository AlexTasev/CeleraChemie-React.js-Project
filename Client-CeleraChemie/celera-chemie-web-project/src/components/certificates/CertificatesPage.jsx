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
  } else if (props.preferredLocale === "gr") {
    imgSrc =
      "http://celera-chemie.com/test/wp-content/uploads/2019/02/CERTIFICATE-ISO-9001-CELERA-CY-GR.jpg";
    pdfLocation =
      "https://celera-chemie.com/cy/wp-content/uploads/2019/02/CERTIFICATE-ISO-9001-CELERA-CY-GR.pdf";
  } else if (props.preferredLocale === "ro") {
    imgSrc =
      "http://celera-chemie.com/test/wp-content/uploads/2019/02/iso-celera-chemie-RO.jpg";
    pdfLocation =
      "https://celera-chemie.com/cy/wp-content/uploads/2019/02/iso-celera-chemie-RO.pdf";
  }

  return (
    <article className="certificates-page">
      <h1>
        <Translate string={"certificates.title"} />
      </h1>
      <p>
        <Translate string={"certificates.content"} />
      </p>
      <a href={pdfLocation} target="_blank" rel="noopener noreferrer">
        <img className="imgCertificate" src={imgSrc} alt="certificate" />
      </a>
    </article>
  );
};

export default Certificates;
