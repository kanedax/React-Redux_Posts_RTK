import React, { useEffect } from "react";
import SearchPost from "./SearchPost";
import "./Posts.css";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/slice/postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const { posts, loading, error } = useSelector((state) => {
    return state.posts;
  });

  return (
    <>
      <SearchPost />
      <div className="posts-list">
        <h1>{`total posts ${posts.length}`}</h1>
        {loading ? (
          <h2>loading...</h2>
        ) : error ? (
          <h2 style={{ color: "red" }}>{error}</h2>
        ) : (
          posts.map((i) => {
            return (
              <div className="post-details" key={i.id}>
                <h3>{i.title}</h3>
                <p>{i.body}</p>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default PostsList;
