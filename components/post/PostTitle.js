import Link from "next/link";
import React from "react";

export default function PostTitle({ id, title }) {
  return (
    <div className="title-render">
      <Link href={`post/${id}`}>
        <a className="title-link">{title}</a>
      </Link>
    </div>
  );
}
