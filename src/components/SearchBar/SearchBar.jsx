import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FcSearch } from "react-icons/fc";
import style from "./SearchBar.module.css";

const SearchBar = ({ onSearch, params }) => {
  const [topic, setTopic] = useState("");
  const formRef = useRef();

  // useEffect(() => {
  //   onSearch(params);
  // }, [params]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (topic === "") {
      toast.error("Please enter a topic to search.");
      return;
    }
    onSearch(topic);
    formRef.current.reset();
    setTopic("");
  };

  console.log(params, `params`);

  return (
    <>
      <header className={style.search_bar}>
        <form className={style.search_form} ref={formRef} onSubmit={handleSubmit}>
          <input type="text" autoComplete="off" name="topic" autoFocus placeholder="Search" value={topic} onChange={(e) => setTopic(e.target.value)} />
          <button type="submit">
            <FcSearch />
            Search
          </button>
        </form>
      </header>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default SearchBar;
