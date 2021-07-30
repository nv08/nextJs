import Link from "next/link";
import React from "react";

export default function PostCategory({ category }) {
  return (
    <div className="tags">
      <Link href="#">
        <a className="tag-link">{category}</a>
      </Link>
    </div>
  );
}
