/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Input from "../components/input/Input";

export default function CreatePost(props) {
  const [postData, setPostData] = useState({
    title: null,
    description: null,
    content: null,
    category: "Coding",
  });

  const handle = (e) => {
    const fieldname = e.target.name;
    setPostData({ ...postData, [fieldname]: e.target.value });
  };

  const location = useRouter();
  let user, cookie;
  user =
    typeof window === "undefined" ? "" : window.localStorage.getItem("user");
  cookie = Cookies.get("token");

  async function dataPost() {
    const res = await fetch("http://localhost:4000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        title: postData.title,
        content: postData.content,
        description: postData.description,
        category: postData.category,
      }),
    });
    if (res.status === 200) {
      location.push({ pathname: "/home" });
    } else {
      location.push({ pathname: "/home" });
    }
  }
  return (
    <>
      {user && cookie ? (
        <div className="container-create">
          <div className="create-header">
            <h1 className="create-heading">Add New Post</h1>
          </div>

          <div className="create-validation-info"></div>

          <div className="create-title">
            <Input
              className="input-title"
              name="title"
              placeholder="enter a title in 4 - 15 words"
              onChange={(e) => handle(e)}
            />
          </div>

          <div className="create-title">
            <Input
              className="input-title"
              name="description"
              placeholder="enter a description in 4 - 15 words"
              onChange={(e) => handle(e)}
            />
          </div>

          <div className="create-content">
            <textarea
              placeholder="Describe Your Article Here..."
              className="create-txtarea"
              name="content"
              id="tx"
              onChange={(e) => handle(e)}
            ></textarea>
          </div>

          <div className="create-tail">
            <div className="category">
              <label className="label-cat">Select Category</label>
              <select
                className="select-cat"
                name="category"
                onChange={(e) => handle(e)}
                required
              >
                <option value="Coding"> Coding</option>
                <option value="Education"> Education</option>
                <option value="Literature"> Literature</option>
                <option value="Sports"> Sports</option>
                <option value="Entertainment"> Entertainment</option>
                <option value="Events"> Events</option>
              </select>

              <div className="submit">
                <button className="button-create" onClick={() => dataPost()}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1> You are not authorized! </h1>
      )}
      <a href="/" className="dashboard-link">
        Back
      </a>
    </>
  );
}
