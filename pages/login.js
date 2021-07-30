/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import Cookies from "universal-cookie";
import Input from "../components/input/Input";

function Login(props) {
  const location = useRouter();
  const [inputData, setinputData] = useState({
    email: null,
    pass: null,
  });

  const handle = (e) => {
    const fieldname = e.target.name;
    setinputData({ ...inputData, [fieldname]: e.target.value });
  };


  async function fetchData() {
    const res = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputData.email,
        password: inputData.pass,
      }),
    });
    if (res.status === 200) {
      const response = await res.json();
      toast.success('login Success!',{
        hideProgressBar:true,
        position:'top-center'
      })
      makeCookie(response);
    } else {
      toast.error('Invalid Credentials!',{
        position:'top-center',
        hideProgressBar:true
      })
      location.push({ pathname: "/login" });
    }
  }
  function makeCookie(response) {
    const cookie = new Cookies();
    cookie.set("token", response.token);
    if (cookie.get("token")) {
      setLocalStorage(response);
      location.push({ pathname: "/home" });
    }
  }

  function setLocalStorage(response) {
    window.localStorage.setItem("user", JSON.stringify(response.user));
  }

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="login-heading">Login</h1>
        <div className="image">
          <img src="./login.png" className="img-login" alt="" />
        </div>
        <div className="infos">
          {/* <% if (messages) { %>
            <span className="error-red"><%= messages.msg  %></span>
        <% } %> */}
        </div>
        <div className="form">
          <label className="label-form">
            <b>EMAIL</b>
          </label>
        <Input name="email" onChange={(e) => handle(e)} />

          <label className="label-form">
            <b>PASSWORD</b>
          </label>
          <Input type="password" name="pass" onChange={(e) => handle(e)} />

          <button
            className="button-form"
            onClick={() => {
              fetchData();
            }}
          >
            <b> LOGIN </b>
          </button>

          <span className="login-tail">
            Need a Account? <Link href="/register"> Register Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
