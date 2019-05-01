import React from "react";
import Translate from "../../locales/Translate";
import "./Contacts.css";

const Contacts = props => {
  let locationImg;

  if (props.preferredLocale === "bg") {
    locationImg =
      "https://am3pap003files.storage.live.com/y4pLzrEiOvVpdFlDPI0Tfs74ea6efz18IiDL03b5sqiDSaw8wqIXS9A9hOos_jIf43cyJp0hPsycE0G4eVMtZkoKh8KE229ZMqd0NdpHN08MmNZN2vBxGswlbMCRKZNqPIk17Y3ZEUImrQzt_rxpTN9zph3lnCNkll6U1WSXMRnDm4-0hZ_0zJ99-cREuexW-HP/location_BG.png?psid=1&width=450&height=440";
  } else if (props.preferredLocale === "ro") {
    locationImg =
      "https://am3pap003files.storage.live.com/y4pHNRinzQVauqsXt50dAGzR-qAl3079pIa3UuJgjsz8u9dEoyBtv7QTBmOL_ujf566YSxBWDoFXbSx9X6oTej6F4NnBbq2rEpcyTWVXaaT-HE1n3-6uclk1oRC1sHHXGnp5MA-BHE1vLdW_ngLoid5kO0eTy5BVd_lNghtJJZqOPIPmi0mE_RTnN2oAudByPKt/location_RO.png?psid=1&width=450&height=449";
  } else if (props.preferredLocale === "gr") {
    locationImg =
      "https://am3pap003files.storage.live.com/y4pPP5Tp42VF_RkFiX9ebAWoURuqUA5Mivrkqgp46-kJHUGbpJH6qEaLtA7QqR6YCmML_3CSEijQKPUHacIQN6pxyXOKq91otbfKaR-MHz9O57OR9yokI-T7tPy-6fj1148VrlYVnSwKuILRBWV0FcnTQW75CrT9_4QZazvx61YcyOUjIJcUpi28kMVDf81o9WW/Location_CY.png?psid=1&width=450&height=450&cropMode=center";
  }

  return (
    <section className="container-contacts">
      <section className="contact-page">
        <article className="contacts-general">
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
        </article>
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
            <br />
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
      </section>
      {locationImg && (
        <div className="location-image">
          <img src={locationImg} alt="Show on the map" />
        </div>
      )}
    </section>
  );
};

export default Contacts;
