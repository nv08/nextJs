/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect } from "react";

export default function Faliures() {
    let user;
  useEffect(() => {
    user = window.localStorage.getItem("user");
  });
  return (
    <>
      <h1>Unauthorized Access!!</h1>
      <a href="/login"> Back To Login </a> &nbsp;
      {user ? (
        <a href="/home"> Back to Dashboard</a>
      ) : (
        <a href="/"> Back to Home</a>
      )}
    </>
  );
}
