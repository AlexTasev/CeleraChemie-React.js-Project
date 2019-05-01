import React from "react";
import Translate from '../../locales/Translate'
import './About.css'

const About = props => {
  return (
    <article className="about-page">
      <h1>
        <Translate string={"about.title"} />
      </h1>
      <p>
        <Translate string={"about.content.p1"} />
      </p>
      <p>
        <Translate string={"about.content.p2"} />
      </p>
      <p>
        <Translate string={"about.content.p3"} />
      </p>
      <img id="portrait"
        src="https://celera-chemie.com/ro/wp-content/uploads/2019/02/KarlToellner_neu-216x300.png"
        alt="Dr. Karl Töllner"
      />
      <div>Dr. Karl Töllner</div>
    </article>
  );
};

export default About;
