/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "../components/input/Input";

export default function Register() {
  const location = useRouter();
  const [inputValue, setinputValue] = useState({
    email: "",
    pass: "",
    username: "",
  });
  console.log(inputValue);
  const handle = (e) => {
    const fieldname = e.target.name;
    setinputValue({ ...inputValue, [fieldname]: e.target.value });
  };

  async function registerUser() {
    const res = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.pass,
        username: inputValue.username,
      }),
    });
    const response = await res.json();
    if (res.status === 200) {
      toast.success("success!", {
        position: "top-center",
        hideProgressBar: true,
      });
      location.push({ pathname: "/login" });
    } else {
      const error = response["errors"]
        ? Object.values(response["errors"][0])[0]
        : null;

      toast.error(error || response["msg"], {
        position: "top-center",
        hideProgressBar: true,
      });
      location.push({ pathname: "/register" });
    }
  }
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1 className="login-heading">Registeration</h1>
          <div className="image">
            <img src="./register.png" className="img-register" alt="register" />
          </div>
          <div className="infos"></div>
          <div className="form">
            <label className="label-form">
              <b>USERNAME</b>
            </label>
            <Input name={"username"} onChange={(e) => handle(e)} />

            <label className="label-form">
              <b>EMAIL</b>
            </label>
            <Input name={"email"} onChange={(e) => handle(e)} />

            <label className="label-form">
              <b>PASSWORD</b>
            </label>
            <Input
              name={"pass"}
              type={"password"}
              onChange={(e) => handle(e)}
            />

            <button className="register-button" onClick={(e) => registerUser()}>
              <b> REGISTER</b>
            </button>

            <span className="register-tail">
              Already Registered? <Link href="/login"> Login Here</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
