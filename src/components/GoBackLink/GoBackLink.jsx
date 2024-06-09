import { Link } from "react-router-dom";

const GoBackLink = ({ txt, location }) => {
  return (
    <>
      <Link to={location ? location : "/movies"}>{txt}</Link>
    </>
  );
};

export default GoBackLink;
