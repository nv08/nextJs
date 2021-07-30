import React from "react";

export default function PostDescription({ desc }) {
  return (
    <div className="description">
      <span className="render-desc">{desc}...</span>
    </div>
  );
}
