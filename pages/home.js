import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import Postrender from "../components/Postrender";
import Utils from "../components/utils";

export default function Home() {
  const location = useRouter();
  const [url, seturl] = useState("");
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(url, fetcher);
  useEffect(() => {
    const { searchQueryAuthor, searchQueryKey, order } = location.query;

    Object.keys(location.query).length > 0
      ? seturl(
          `http://localhost:4000/api/posts/?author=${searchQueryAuthor}&key=${searchQueryKey}&order=${order}`
        )
      : seturl("http://localhost:4000/api/posts/");
  }, [location.query]);

  if (!data) {
    return <div> loading..</div>;
  }

  if (error) {
    ("please try  again!");
  }
  return (
    <>
      <Utils />
      <Postrender posts={data}></Postrender>
    </>
  );
}
