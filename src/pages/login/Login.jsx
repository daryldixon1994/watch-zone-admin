import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  // const PKEY = process.env.PKEY;
  function handleLogin() {
    setLoading(true);
    axios
      .post("https://watch-zone.onrender.com/api/admin/login", loginData, {
        headers: {
          "access-control-allow-origin": "http://localhost:3000/",
        },
      })
      .then((res) => {
        setLoading(false);
        let test = jwtDecode(res.data.data.token);
        if (test.id === res.data.data.id) {
          // console.log(res.data.data);
          sessionStorage.setItem("session-data", JSON.stringify(res.data.data));
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 3000);
        } else {
          console.log("not verified");
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrMsg(err.response.data.message);
        setTimeout(() => {
          setErrMsg("");
        }, 5000);
        // console.log(err);
      });
  }
  return (
    <div className="" id="login-page">
      <nav className="p-3 text-5xl">
        <h3>WatchZone</h3>
      </nav>
      <div className="flex flex-col items-center justify-center" id="login-box">
        <form
          className="flex flex-col items-center gap-5 border-2 border-[#c9c9c9] rounded-lg lg:w-[33%] w-[85%] lg:p-10 p-4"
          onChange={(e) => {
            setLginData({ ...loginData, [e.target.name]: e.target.value });
          }}
        >
          <input
            className={"email-bx"}
            name="email"
            type="email"
            placeholder="email"
          />
          <span className="err-msg"> </span>
          <input
            className={"pwd-bx"}
            name="password"
            type="password"
            placeholder="passsword"
          />
          <span className="err-msg"> {errMsg && errMsg} </span>
          <button onClick={() => handleLogin()} type="button">
            {loading ? "Loading..." : "Connect"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
