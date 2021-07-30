/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";

export default function PostAuthorDetails({ name, date }) {
  return (
    <div className="author">
      <img src="/login.png" className="user-image" alt="login" />
      <span className="post-render-tail">
        <div className="tooltip">
          <span className="render-author-name">{name.toUpperCase()}</span>
        </div>
        <b className="bold"> &nbsp; | &nbsp; </b>
      </span>
      <span className="render-post-date">{moment(date).format("MMM YY")}</span>
    </div>
  );
}
