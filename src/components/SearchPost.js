import React from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { searchPost } from "../redux/slice/postsSlice";

const SearchPost = () => {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPost(search));
  };

  const { posts, loading, error } = useSelector((state) => {
    return state.posts;
  });

  return (
    <div className="form-header">
      <div>
        <h2>React Redux Project</h2>
        <p>
          This project is a simple React Redux project that fetches data with
          search functionality from an API
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search for a post"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPost;
