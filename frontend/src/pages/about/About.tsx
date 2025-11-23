import { Typography } from "@mui/material";
import "./about-styles.scss";
import aboutAuction1 from "../../assets/aboutAuction1.png";
import aboutAuction2 from "../../assets/aboutAuction2.png";
import aboutAuction4 from "../../assets/aboutAuction3.png";
import aboutAuction5 from "../../assets/aboutAuction4.png";
import aboutCopy from "./about.copy";

const About = () => {
  const aboutSubitem = (
    heading: string,
    description: string | Record<string, string>,
    image?: string
  ) => (
    <div className={`about__grid ${!image && "about__grid--full"}`}>
      {image && (
        <div className="about__imageContainer">
          <img src={image} alt={`${heading}`} className="about__image" />
        </div>
      )}
      <div className="about__textContainer">
        <Typography variant="body1" className="about__heading">
          {heading}
        </Typography>

        {typeof description === "string" ? (
          <Typography variant="body1" className="about__description">
            {description}
          </Typography>
        ) : (
          <ul className="about__list">
            {Object.keys(description).map((key, index) => {
              if (key.startsWith("subHeading")) {
                const textKey = `text${key.replace("subHeading", "")}`;
                return (
                  <li key={index}>
                    <Typography
                      variant="subtitle1"
                      className="about__subheading"
                    >
                      {description[key]}
                    </Typography>
                    <Typography variant="body2" className="about__description">
                      {description[textKey]}
                    </Typography>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="about__container">
      <div className="about__header">
        <Typography variant="h3" className="about__title">{aboutCopy.title}</Typography>
      </div>
      <div className="about__content">
        {aboutSubitem(
          aboutCopy.heading1,
          aboutCopy.description1,
          aboutAuction1
        )}
        {aboutSubitem(
          aboutCopy.heading2,
          aboutCopy.description2,
          aboutAuction2
        )}
        {aboutSubitem(aboutCopy.heading3, aboutCopy.description3)}

        {aboutSubitem(
          aboutCopy.heading4,
          aboutCopy.description4,
          aboutAuction4
        )}
        {aboutSubitem(
          aboutCopy.heading5,
          aboutCopy.description5,
          aboutAuction5
        )}
      </div>
      <hr className="about__separator" />
    </div>
  );
};

export default About;
