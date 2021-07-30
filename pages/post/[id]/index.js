/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import ActionButtons from "../../../components/SinglePost/ActionButtons";
import AuthorName from "../../../components/SinglePost/AuthorBar/AuthorName";
import Category from "../../../components/SinglePost/AuthorBar/Category";
import SingleDesc from "../../../components/SinglePost/SingleDesc";
import SingleTitle from "../../../components/SinglePost/SingleTitle";

export default function Index() {
  const location = useRouter();
  const { id } = location.query;
  const url = `http://localhost:4000/api/posts/${id}`;
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(url, fetcher);
  if (!data) {
    return <div> loading..</div>;
  }

  return (
    <>
      <div className="container-single">
        <div className="single-title">
          <SingleTitle title={data.title} />
          <ActionButtons id={data.post_id} authorId={data.author_id} />
        </div>

        <div className="single-author-info">
          <SingleDesc description={data.description} />

          <div className="single-author">
            <AuthorName name={data.author.author_name} />

            <div className="read-time">
              <span className="span-read-time">2 min read</span>
            </div>

            <Category category={data.category} />
          </div>
        </div>

        <div className="single-content">
          <p className="para-image">
            <img src="/nature.jpeg" className="img-para" alt="cover-Image" />
          </p>
          {data.content}
        </div>
      </div>
    </>
  );
}
