import { Link } from "react-router-dom";
import css from "./GoBackLink.module.css";

const GoBackLink = ({ txt, location }) => {
  return (
    <>
      <Link to={location ?? "/movies"} className={css.go_back_link}>
        {txt}
      </Link>
    </>
  );
};

export default GoBackLink;
