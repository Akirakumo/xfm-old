import React from "react";

import Login from "./components/Login/index";
import Home from "./components/Home/index";

const isLogin = localStorage.getItem("isLogin");

export default function APP() {
  return <>{isLogin === "true" ? <Home /> : <Login />}</>;
}
