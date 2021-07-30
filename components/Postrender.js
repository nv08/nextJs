/* eslint-disable @next/next/no-img-element */
import React from "react";

import moment from "moment";
import Utils from "./utils";
import PostTitle from "./post/PostTitle";
import PostDescription from "./post/PostDescription";
import PostAuthorDetails from "./post/PostAuthorDetails.js";
import PostCategory from "./post/PostCategory";

export default function Postrender({ posts }) {
  return (
    <>
      <div className="container-render">
        {posts.length === 0 ? (
          <h1> Nothing found!! Please Try Again</h1>
        ) : (
          posts.map((post) => (
            <div className="post" key={post.post_id}>
              <div className="post-image-box">
                <img src="/test.jpeg" className="post-image" alt="cover" />
              </div>
              <div className="content-render">
                <PostCategory category={post.category} />

                <PostTitle id={post.post_id} title={post.title} />

                <PostDescription desc={post.description} />

                <PostAuthorDetails
                  name={post.author.author_name}
                  date={post.date}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
