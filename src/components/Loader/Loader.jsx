import { FallingLines } from "react-loader-spinner";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <>
      <div className={style.loader}>
        <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading" />{" "}
      </div>
    </>
  );
};

export default Loader;
