import Link from "next/link";
import React from "react";

export default function SingleTitle({ title }) {
  return (
    <div>
      <Link href="#">
        <a className="single-title-heading">{title}</a>
      </Link>
    </div>
  );
}
