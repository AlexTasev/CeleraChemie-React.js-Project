import React from "react";
import "../Footer/Footer.css";

const Footer = props => {
  return (
    <footer>
      <section>
        <article className="footer-contacts">
          <p>
            <u>BULGARIA</u>
          </p>
          <p>CELERA CHEMIE Ltd.</p>
          <p>52 Borovo street, 1680 Sofia</p>
          <p>phone: +359/ 24 27 56 69</p>
        </article>
        <article className="footer-contacts">
          <p>
            <u>CYPRUS</u>
          </p>
          <p>CELERA CHEMICALS Ltd.</p>
          <p>2B Bogaziou Street, 2540 Nicosia</p>
          <p>phone: +357/ 22 31 97 80</p>
        </article>
        <article className="footer-contacts">
          <p>
            <u>ROMANIA</u>
          </p>
          <p>CELERA CHEMIE SRL</p>
          <p>Sos. Centura 24-26 Tunari, Ilfov</p>
          <p>phone: +403/ 14 26 01 53</p>
        </article>
      </section>
      <section className="author">
        <p>&copy; 2019 Aleksandar Tasev</p>
      </section>
    </footer>
  );
};

export default Footer;
