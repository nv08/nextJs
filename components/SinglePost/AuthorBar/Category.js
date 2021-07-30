import React from "react";

export default function Category({category}) {
  return (
    <div className="tags">
      <span className="span-tags">#{category}</span>
    </div>
  );
}
