
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Index() {
  const location = useRouter();
  const { id } = location.query;
  const url = `http://localhost:4000/api/posts/${id}`;

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(url, fetcher);

  const [updatePost, setupdatePost] = useState({
    title: '',
    description: '',
    content:  '',
    
  });

  if (!data) {
    return <div> loading..</div>;
  }

  let user, cookie;
  user =
    typeof window === "undefined" ? "" : window.localStorage.getItem("user");
  cookie = Cookies.get("token");
console.log(updatePost);
  async function modifyPost() {
      
    const res = await fetch(`http://localhost:4000/api/posts/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        title: updatePost.title || data.title,
        content: updatePost.content || data.content,
        description: updatePost.description || data.description,
      }),
    });
    if (res.status === 200) {
      toast.success("successful!!", {
        position: "top-center",
      });
      location.push({ pathname: `/home` });
    } else {
      toast.error("something went wrong!", {
        position: "top-center",
      });
      location.push({
        pathname: `http://localhost:3000/post/${id}`,
      });
    }
  }

  const handle = (e) => {
    const fieldname = e.target.name;
    setupdatePost({ ...updatePost, [fieldname]: e.target.value });
  };

  return (
    <>
      <div className="container-create">
        <div className="create-header">
          <h1 className="create-heading">Edit the Post</h1>
        </div>

        <div className="create-validation-info"></div>

        <div className="create-title">
          <input
            type="text"
            className="input-title"
            name="title"
            placeholder="enter a title in 12 - 15 words"
            value={updatePost.title?updatePost.title:data.title}
            onChange={(e) => handle(e)}
          />
        </div>

        <div className="create-title">
          <input
            type="text"
            className="input-title"
            name="description"
            placeholder="enter a short description in 12 - 15 words"
            value={updatePost.description?updatePost.description:data.description}
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
          >
            {updatePost.content?updatePost.content:data.content}
          </textarea>
        </div>

        <div className="create-tail">
          <div className="category">
            <label className="label-cat">Select Category</label>
            <select className="select-cat" name="category" disabled>
              <option> {data.category}</option>
            </select>

            <div className="submit">
              <button className="button-create" onClick={() => modifyPost()}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <Link href="/home">
        <a className="dashboard-link"> Back </a>
      </Link>
    </>
  );
}
