import { FallingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={css.loader}>
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading" />{" "}
      </div>
    </>
  );
};

export default Loader;
