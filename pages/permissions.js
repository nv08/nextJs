import React from "react";
import useSWR from "swr";

export default function Permissions() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "http://localhost:4000/api/posts/roles",
    fetcher
  );
  if (!data) {
    return <div>loading...</div>;
  }

  function changeRole(author) {
    const id = author.target.id;

    const role = author.target.checked ? "Author" : "Editor";

    const url = `http://localhost:4000/role/change/${id}/${role}`;
   

    const res = fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((x) => console.log(x));
    location.reload()
  }
  return (
    <>
      <table>
        <tr>
          <th>UserName</th>
          <th>Role</th>
          <th>Change Role</th>
        </tr>

        {data.map((author, i) => (
          <tr key={i}>
            <td>{author.name}</td>
            <td>{author.role}</td>
            <td>
              {author.role === "Author" || author.role === "Editor" ? (
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name={author.name}
                      id={author.id}
                      defaultChecked={author.role === "Editor" ? true : false}
                      onClick={(author) => changeRole(author)}
                    />{" "}
                    <div></div>
                  </label>
                </div>
              ) : null}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
