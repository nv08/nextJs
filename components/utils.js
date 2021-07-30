import { useRouter } from "next/router";
import React, { useState } from "react";
import useSWR from "swr";

export default function Utils() {
    const location = useRouter()
  
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("http://localhost:4000/all/authors", fetcher);

  const [filterData, setfilterData] = useState({
    searchQueryAuthor: location.query.searchQueryAuthor || "",
    searchQueryKey: location.query.searchQueryKey || "",
    asc:  false,
    desc: true,
  });

  if (!data) {
    return <div> loading..</div>;
  }
  const handle = (e) => {
    const fieldname = e.target.name;
    setfilterData({ ...filterData, [fieldname]: e.target.value });
  };
  return (
    <>
      <form className="filter-form">
        <div className="author-utils">
          <div className="author-label">
            <label className="label-author">
              <b>Author</b>
            </label>
          </div>
          <div className="author-select">
            <select
              className="select-author"
              name="searchQueryAuthor"
              value={filterData.searchQueryAuthor}
              onChange={(e) => handle(e)}
            >
              {data.map((author, i) => {
                return <option key={i}> {author.author_name}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="author-utils">
          <div className="author-label">
            <label className="label-author">
              <b>Keyword</b>
            </label>
          </div>
          <div className="author-select">
            {filterData.searchQueryKey ? (
              <input
                type="text"
                className="input-key"
                name="searchQueryKey"
                value={filterData.searchQueryKey}
                onChange={(e) => handle(e)}
              />
            ) : (
              <input
                type="text"
                className="input-key"
                name="searchQueryKey"
                placeholder=" Search by keyword"
                onChange={(e) => handle(e)}
              />
            )}
          </div>
        </div>

        <div className="author-utils">
          <div className="author-label">
            <label className="label-author">
              <b>Sort By</b>
            </label>
          </div>
          <div className="author-select-radio">
            <input
              type="radio"
              value="asc"
              name="order"
              className="input-sort"
              checked={filterData.asc}
              onChange={() =>
                setfilterData({ ...filterData, ["asc"]: true, ["desc"]: false })
              }
            />
            <label className="sort-label"> asc</label>
            <input
              type="radio"
              value="desc"
              name="order"
              className="input-sort"
              checked={filterData.desc}
              onChange={() =>
                setfilterData({ ...filterData, ["asc"]: false, ["desc"]: true })
              }
            />
            <label className="sort-label"> desc</label>
          </div>
        </div>

        <div className="filter-button">
          <button className="button-filter" >
            Apply
          </button>
        </div>
      </form>
    </>
  );
}

export const Filter = async()=>{
    const data = useSWR('http://localhost:4000/',fetcher)

}