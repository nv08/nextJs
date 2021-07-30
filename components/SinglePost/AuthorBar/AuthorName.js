/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function AuthorName({name}) {
  return (
    <div className="single-author-image">
      <img src="/user.png" className="img-single-author"  alt="user"/>
      <label className="single-author-name-info">
        {name}
      </label>
    </div>
  );
}
