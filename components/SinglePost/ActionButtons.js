/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import Link from "next/link";

import React from "react";

export default function ActionButtons({ id, authorId }) {
  const user =
    typeof window === "undefined"
      ? ""
      : JSON.parse(window.localStorage.getItem("user"));
  const cookie = Cookies.get("token");

  return (
    <div>
      {user &&
      (user.role === "Admin" ||
        user.role === "Editor" ||
        (user.role === "Author" && user.id == authorId)) ? (
        <Link href={`/postUpdate/${id}`}>
          <a className="edit-link">
            <img src="/edit.png" className="img-edit" alt="edit" />
            <span>Edit</span>
          </a>
        </Link>
      ) : null}

      {user &&
      (user.role === "Admin" ||
        ((user.role === "Editor" || user.role === "Author") &&
          user.id == authorId)) ? (
        <Link href={`/postDelete/${id}`}>
          <a className="edit-link">
            <img src="/delete.png" className="img-edit" alt="delete" />
            <span>Delete</span>
          </a>
        </Link>
      ) : null}
    </div>
  );
}
