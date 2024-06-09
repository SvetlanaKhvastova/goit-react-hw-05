import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>404 - Page not found</h1>
      <Link to="/">Go back to the main page</Link>
    </>
  );
};

export default NotFoundPage;
