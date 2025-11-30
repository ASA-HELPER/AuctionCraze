import "./notFound-styles.scss";
import PageNotFound from "../../assets/pageNotFound.png";

const NotFound = () => {
  return (
    <div className="notFound__container">
      <img
        src={PageNotFound}
        alt="Page Not Found"
        className="notFound__image"
      />
    </div>
  );
};

export default NotFound;
