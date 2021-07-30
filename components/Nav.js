/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Nav() {
  let user, cookie;
  user =
    typeof window === "undefined"
      ? ""
      : JSON.parse(window.localStorage.getItem("user"));
  cookie = Cookies.get("token");

  return (
    <>
      <div className="bar">
        <div className="heading1">
          <div className="nav-bar-image">
            <img src="/nv.png" className="nav-image" />
          </div>
          <div className="nav-bar-heading">
            <h1 className="logo-gradient">Blogs</h1>
          </div>
        </div>

        <div className="heading2">
          {cookie && user ? (
            user.role === "Admin" ? (
              <ul className="bar-list">
                <Link href="/home" className="nav">
                  <li className="nav">Welcome {user ? user.name : ""}</li>
                </Link>

                <Link href="/permissions" className="nav">
                  <li className="nav">Accounts</li>
                </Link>

                <Link href="/createPost" className="nav">
                  <li className="nav">Create</li>
                </Link>

                <a href="/logout" className="nav">
                  <li className="nav">Logout</li>
                </a>
              </ul>
            ) : (
              <ul className="bar-list">
                <Link href="/home" className="nav">
                  <li className="nav">Welcome {user ? user.name : ""}</li>
                </Link>

                <Link href="/createPost" className="nav">
                  <li className="nav">Create</li>
                </Link>

                <Link href="/logout" className="nav">
                  <li className="nav">Logout</li>
                </Link>
              </ul>
            )
          ) : (
            <ul className="bar-list">
              <Link href="/" className="nav">
                <li className="nav">Home</li>
              </Link>
              <Link href="/login" className="nav">
                <li className="nav">Sign In</li>
              </Link>
              <Link href="/register" className="nav">
                <li className="nav">Sign Up</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
